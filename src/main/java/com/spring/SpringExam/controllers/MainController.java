package com.spring.SpringExam.controllers;


import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import com.spring.SpringExam.models.AppRole;
import com.spring.SpringExam.models.AppUser;
import com.spring.SpringExam.models.ROLE;
import com.spring.SpringExam.models.UserRole;
import com.spring.SpringExam.repositories.IRoleRepository;
import com.spring.SpringExam.repositories.IUserRepository;
import com.spring.SpringExam.repositories.IUserRoleRepository;
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
import javax.transaction.Transactional;

@Controller
public class MainController {

    ROLE Role;
    @Autowired
    IUserRepository userRepository;
    @Autowired
    IRoleRepository roleRepository;
    @Autowired
    IUserRoleRepository userRoleRepository;

    @Autowired
    private EntityManager entityManager;

    @RequestMapping(value = {"/", "/welcome"}, method = RequestMethod.GET)
    public String welcomePage(Model model) {
        model.addAttribute("title", "Welcome");
        model.addAttribute("message", "This is welcome page!");
        HttpServletRequest httpRequest ;
//PROVERYAET NA ROLI
        //System.out.println(httpRequest.isUserInRole("ROLE_SuperAdmin"));


       /* AppRole user = new AppRole("User");
        AppRole admin = new AppRole("Admin");
        AppRole superAdmin = new AppRole("SuperAdmin");
        AppRole superAdmin = new AppRole("SuperAdmin");

        roleRepository.save(superAdmin);
        roleRepository.save(admin);
        roleRepository.save(user);*/

       /* AppRole superAdmin = new AppRole("ROLE_ADMIN");
        roleRepository.save(superAdmin);*/

 /*AppRole superAdmin = new AppRole("ROLE_SuperAdmin");
        roleRepository.save(superAdmin);*/

       /* AppRole superAdmin = new AppRole("ROLE_User");
        roleRepository.save(superAdmin);*/

        for (AppRole role : roleRepository.findAll()) {
            System.out.println(role.toString());
        }

        /*for (String name:appRoleDAO.getRoleNames(new Long(7))) {
            System.out.println("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.out.println(name);

            System.out.println("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }*/

     /*  AppUser appUser = userRepository.findById((long)3).get();
       AppRole userRole = roleRepository.findById((long)1).get();
        UserRole userRol = new UserRole(appUser,userRole);
        userRoleRepository.save(userRol);*/
        return "welcomePage";
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
        return "adminPage";
    }

    //UserRole

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
        return  "adminPage";
    }


    @RequestMapping(value = "/saveUser" ,method = RequestMethod.POST)
    public String createUser(@RequestParam String role,@RequestParam String userName, @RequestParam String password ,Model model,HttpServletRequest httpRequest ,Principal principal) {
        if (userName!=null && !userName.isEmpty() && password!=null && !password.isEmpty()){
            try {
                password = EncrytedPasswordUtils.encrytePassword(password);


                AppUser appUser = new AppUser(userName, password, true);
                AppRole userRole = roleRepository.getAppRoleByRoleName(role);

                /*if (ROLE.equals("ROLE_Admin")){

                    userRole = roleRepository.findById((long) 2).get();
                } else{
                    userRole = roleRepository.findById((long) 3).get();
                }*/

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

        return  "adminPage";
    }


   /* @RequestMapping(value = "/registration" , method = RequestMethod.GET)
    public String registration(Model model, Principal principal) {

        System.out.println("111");
        return "registration";
    }*/

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String registration(@RequestParam String name, @RequestParam String password,@RequestParam String repaetpassword, Model model) {


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


            //if (userRepository.count()==0)

            UserRole userRol = new UserRole(appUser, userRole);


            userRepository.save(appUser);
            userRoleRepository.save(userRol);
            System.out.println("error 1 Name : " + name + "\nPassword : " + password);
        }else{
            model.addAttribute("info","Your passwords do not match");
            return  "registration";
        }



        return "loginPage";
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

        return "adminPage";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginPage(Model model) {

        return "loginPage";
    }

    @RequestMapping(value = "/logoutSuccessful", method = RequestMethod.GET)
    public String logoutSuccessfulPage(Model model) {
        model.addAttribute("title", "Logout");
        return "logoutSuccessfulPage";
    }

    @RequestMapping(value = "/userInfo" )
    public String userInfo(Model model, Principal principal) {

        // After user login successfully.
        String userName = principal.getName();

        System.out.println("User Name: " + userName);

        User loginedUser = (User) ((Authentication) principal).getPrincipal();

        String userInfo = WebUtils.toString(loginedUser);
        model.addAttribute("userInfo", userInfo);

        return "userInfoPage";
    }
    @RequestMapping(value = "/about" )
    public String about(Model model, Principal principal) {


        return "aboutUs";
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

        return "403Page";
    }

}