package com.spring.SpringExam.controllers;


import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import com.spring.SpringExam.models.*;
import com.spring.SpringExam.repositories.*;
import com.spring.SpringExam.utils.EncrytedPasswordUtils;
import com.spring.SpringExam.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;

@Controller
public class MainController {

    ROLE Role;
    @Autowired
    IUserRepository userRepository;
    @Autowired
    IAnswerRepository answerRepository;
    @Autowired
    ICategoryRepository categoryRepository;
    @Autowired
    IQuestionRepository questionRepository;
    @Autowired
    IRoleRepository roleRepository;
    @Autowired
    IUserRoleRepository userRoleRepository;
    @Autowired
    IScoreRepository scoreRepository;

    @Autowired
    private EntityManager entityManager;


    @RequestMapping(value = {"/", "/welcome"}, method = RequestMethod.GET)
    public String welcomePage(Model model) {
        model.addAttribute("title", "Welcome");
        model.addAttribute("message", "This is welcome page!");
        HttpServletRequest httpRequest ;

     //   answerRepository.deleteAll();
     //   categoryRepository.deleteAll();
     //   questionRepository.deleteAll();
      //  userRoleRepository.deleteAll();
   //     roleRepository.deleteAll();
     //    userRepository.deleteAll();

      if (roleRepository.count()==0){

            AppRole role1 = new AppRole();
         //   role1.setRoleId(new Long(1));
            role1.setRoleName("ROLE_SuperAdmin");

            AppRole role2 = new AppRole();
          //  role2.setRoleId(new Long(2));
            role2.setRoleName("ROLE_Admin");

            AppRole role3 = new AppRole();
         //   role3.setRoleId(new Long(3));
            role3.setRoleName("ROLE_User");


            roleRepository.save(role1);
            roleRepository.save(role2);
            roleRepository.save(role3);
        }



        for (AppRole role : roleRepository.findAll()) {
            System.out.println(role.toString());
        }

        return "main/welcomePage";
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String adminPage(Model model, Principal principal,HttpServletRequest httpRequest) {

        User loginedUser = (User) ((Authentication) principal).getPrincipal();

        String userInfo = WebUtils.toString(loginedUser);
        model.addAttribute("userInfo", userInfo);;
        List<UserRole> users = new ArrayList<>();
        if (httpRequest.isUserInRole(ROLE.ROLE_SuperAdmin.toString())){
            users  = (List<UserRole>) userRoleRepository.findAll();// userRepository.findAll();
            System.out.println("ok");
            model.addAttribute("btn", "Add");;
        }else {
            users = sortingRole("ROLE_User");
        }

        model.addAttribute("users", users);
        return "main/adminPage";
    }


    public List<UserRole> sortingRole(String role){
        List<UserRole> users = new ArrayList<>();
        for (UserRole userRole:userRoleRepository.findAll()) {
            if (userRole.getAppRole().getRoleName().equals(role)){
                users.add(userRole);
            }
        }

        return users;
    }


    @RequestMapping(value = "/createUser" )
    public String createUser(Model model, Principal principal) {
        model.addAttribute("addUser","User");
        return  "main/adminPage";
    }


    @RequestMapping(value = "/saveUser" ,method = RequestMethod.POST)
    public String createUser(@RequestParam String role,@RequestParam String userName, @RequestParam String password ,Model model,HttpServletRequest httpRequest ,Principal principal) {
        if (userName!=null && !userName.isEmpty() && password!=null && !password.isEmpty()){
            try {
                password = EncrytedPasswordUtils.encrytePassword(password);


                AppUser appUser = new AppUser(userName, password, true);
                AppRole userRole = roleRepository.getAppRoleByRoleName(role);



                UserRole userRol = new UserRole(appUser, userRole);
                userRepository.save(appUser);
                userRoleRepository.save(userRol);
                model.addAttribute("message","User added successfully!!!");
            }catch (Exception ex){
                model.addAttribute("message","User not added!!! " + ex.getMessage());
            }

        }else{
            model.addAttribute("message","User not added!!!");
        }

        List<UserRole> users = new ArrayList<>();
        if (httpRequest.isUserInRole("ROLE_SuperAdmin")){
            users  = (List<UserRole>)userRoleRepository.findAll();// userRepository.findAll();

            model.addAttribute("btn", "Add");;
        }else {
            users = sortingRole("ROLE_User");
        }

        model.addAttribute("users", users);

        return  "main/adminPage";
    }

    @RequestMapping(value = "/registration" , method = RequestMethod.GET)
    public String registration(Model model, Principal principal) {

        System.out.println("111");
        return "main/registration";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String registration(@RequestParam String name, @RequestParam String password,@RequestParam String repaetpassword, Model model) {


       try {
           if (password.equals(repaetpassword)){
               System.out.println("error 1 Name : " + name + "\nPassword : " + password);

               password = EncrytedPasswordUtils.encrytePassword(password);


               AppUser appUser = new AppUser(name, password, true);
               AppRole userRole = null;
               if (userRepository.count()==0){
                   userRole = roleRepository.getAppRoleByRoleName("ROLE_SuperAdmin");
               }else{
                   userRole = roleRepository.getAppRoleByRoleName("ROLE_User");
                }


               UserRole userRol = new UserRole(appUser, userRole);


               userRepository.save(appUser);
               userRoleRepository.save(userRol);
               System.out.println("error 1 Name : " + name + "\nPassword : " + password);
           }else{
               model.addAttribute("info","Your passwords do not match");
               return  "main/registration";
           }
       }catch (Exception ex){

       }



        return "main/loginPage";
    }

    @RequestMapping("/deleteUser")
    public String deleteUser(@RequestParam Long id){
       AppUser user = userRepository.getByUserId(id);
       String role = userRoleRepository.getUserRoleByAppUser(user).getAppRole().getRoleName();
       if (!role.equals(ROLE.ROLE_SuperAdmin.toString()))
             userRepository.deleteById(id);
        return  "redirect:/admin";
    }



    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public String edit(@ModelAttribute AppUser user ,Model model) {


        AppUser tmpUser = userRepository.getByUserId(user.getUserId());

        if (!tmpUser.getEncrytedPassword().equals(user.getEncrytedPassword())){
            String passsword = user.getEncrytedPassword();
            passsword = EncrytedPasswordUtils.encrytePassword(passsword);
            user.setEncrytedPassword(passsword);
        }

        userRepository.save(user);

        return  "redirect:/admin";
    }

    @RequestMapping("/updateUser")
    public String updateUser(@RequestParam Long id,  HttpServletRequest httpRequest,Model model){

        if (httpRequest.isUserInRole(ROLE.ROLE_SuperAdmin.toString())) {
            AppUser user = userRepository.getByUserId(id);
            model.addAttribute("user",user);

        }else if (httpRequest.isUserInRole(ROLE.ROLE_Admin.toString())){
            AppUser user =  userRepository.getByUserId(id);
            UserRole userRole = userRoleRepository.getUserRoleByAppUser(user);
            if (userRole.getAppRole().equals(ROLE.ROLE_Admin.toString())){
                return  "redirect:/admin";
            }
        }

        return "main/adminPage";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginPage(Model model) {

        return "main/loginPage";
    }

    @RequestMapping(value = "/logoutSuccessful", method = RequestMethod.GET)
    public String logoutSuccessfulPage(Model model) {
        model.addAttribute("title", "Logout");
        return "main/logoutSuccessfulPage";
    }

    @RequestMapping(value = "/about" )
    public String about(Model model, Principal principal) {

        return "main/aboutUs";
    }




    @RequestMapping(value = "/403", method = RequestMethod.GET)
    public String accessDenied(Model model, Principal principal) {

        if (principal != null) {
            User loginedUser = (User) ((Authentication) principal).getPrincipal();

            String userInfo = WebUtils.toString(loginedUser);

            model.addAttribute("userInfo", userInfo);

            String message = "Hi " + principal.getName() //
                    + "<br> You do not have permission to access this page!";
            model.addAttribute("message", message);

        }

        return "main/403Page";
    }

}