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
        return "answer/createAnswer";
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

        return "answer/createAnswer";
    }

    @RequestMapping("/removeAnswer")
    public String removeAnswer(@RequestParam Long id, Model model, HttpServletRequest httpRequest) {
        if (answerRepository.existsById(id)) answerRepository.deleteById(id);
        return "redirect:/createAnswer";
    }

    @RequestMapping("/createNewAnswer")
    public String createNewAnswer(Model model) {
        List<Answer> answers = (List<Answer>) answerRepository.findAll();
        if (!answers.isEmpty())
            model.addAttribute("answers",answers);

        model.addAttribute("newAnswer","newAnswer");
        return "answer/createAnswer";
    }

    @RequestMapping("/updateAnswer")
    public String updateAnswer(@RequestParam Long id,  Model model) {

        List<Answer> answers = (List<Answer>) answerRepository.findAll();
        if (!answers.isEmpty())
            model.addAttribute("answers",answers);

        model.addAttribute("answer" ,answerRepository.getAnswerById(id));
        model.addAttribute("editAnswer" ,"editAnswer");
        return "answer/createAnswer";
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
        return "answer/createAnswer";
    }


}
