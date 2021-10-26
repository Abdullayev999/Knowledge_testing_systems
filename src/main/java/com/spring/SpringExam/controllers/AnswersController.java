package com.spring.SpringExam.controllers;


import com.spring.SpringExam.models.Answer;
import com.spring.SpringExam.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class AnswersController {

    @Autowired
    IAnswerRepository answerRepository;


    @Autowired
    private IUserRepository userRepository;


    @RequestMapping("/createAnswer")
    public String createAnswer( Model model, HttpServletRequest httpRequest) {
        List<Answer> answers = (List<Answer>) answerRepository.findAll();
        if (!answers.isEmpty())
        model.addAttribute("answers",answers);
        return "createAnswer";
    }

    @RequestMapping("/saveAnswer")
    public String saveAnswer(@RequestParam String answer, Model model, HttpServletRequest httpRequest) {

       List<Answer> answers = (List<Answer>) answerRepository.findAll();
       Boolean isHave = answers.stream().anyMatch(i->i.getName().equals(answer));
       if (!isHave){
           Answer ans = new Answer(answer);
           answerRepository.save(ans);
       }else{
           model.addAttribute("error", "This answer is have");
       }

        answers = (List<Answer>) answerRepository.findAll();
        if (!answers.isEmpty())
            model.addAttribute("answers",answers);

        return "createAnswer";
    }

    @RequestMapping("/removeAnswer")
    public String removeAnswer(@RequestParam Long id, Model model, HttpServletRequest httpRequest) {
        answerRepository.deleteById(id);
        return "redirect:/createAnswer";
    }

    @RequestMapping("/createNewAnswer")
    public String createNewAnswer(Model model, HttpServletRequest httpRequest) {
        List<Answer> answers = (List<Answer>) answerRepository.findAll();
        if (!answers.isEmpty())
            model.addAttribute("answers",answers);

        model.addAttribute("newAnswer","newAnswer");
        return "createAnswer";
    }

    @RequestMapping("/updateAnswer")
    public String updateAnswer(@RequestParam Long id,  Model model, HttpServletRequest httpRequest) {

        List<Answer> answers = (List<Answer>) answerRepository.findAll();
        if (!answers.isEmpty())
            model.addAttribute("answers",answers);

        model.addAttribute("answer" ,answerRepository.getAnswerById(id));
        model.addAttribute("editAnswer" ,"editAnswer");
        return "createAnswer";
    }




    @RequestMapping("/editAnswer")
    public String editAnswer(@ModelAttribute Answer answer, Model model, HttpServletRequest httpRequest) {

        List<Answer> answers = (List<Answer>) answerRepository.findAll();
        Boolean isHave = answers.stream().anyMatch(i->i.getName().equals(answer.getName()));
        if (isHave){
            model.addAttribute("error", "This answer is have");
        }else{
            answerRepository.save(answer);
        }

        answers = (List<Answer>) answerRepository.findAll();
        if (!answers.isEmpty())
            model.addAttribute("answers",answers);
        return "createAnswer";
    }




    /*@RequestMapping("/tests")
    public String checkAnswers(@RequestParam Map<String, String> searchParams, Model model, HttpServletRequest httpRequest) {

        System.out.println("\n1\n1\n1\n1");
        for (String param : searchParams.values()) {
            System.out.println(param);
        }

        *//*String a = "";
        Map<String,String[]> map = httpRequest.getParameterMap();


        LinkedList<Questions> questions = myGame.getQuestions();
        int count = 0 ;*//*

        // model.addAttribute("count",map.get("Q1"));
        //  String str = request.toString();
        //  model.addAttribute("questions",myGame.getQuestions());
        //  model.addAttribute("str",str);
        return "test";
    }*/

   /* @GetMapping(value = "/quiz1")
    public String checkAnswers(@RequestParam String Q1,@RequestParam String Q2,@RequestParam String Q3,@RequestParam String Q4, Model model) {

        LinkedList<Questions> questions = myGame.getQuestions();
    int count = 0 ;

        if (Q1.equals(questions.get(0).getRightAnswer()))  count++;
        if (Q2.equals(questions.get(1).getRightAnswer()))  count++;
        if (Q3.equals(questions.get(2).getRightAnswer()))  count++;
        if (Q4.equals(questions.get(3).getRightAnswer()))  count++;


        model.addAttribute("count",count);
       //  String str = request.toString();
      //  model.addAttribute("questions",myGame.getQuestions());
      //  model.addAttribute("str",str);
        return "myQuiz";
    }*/


}
