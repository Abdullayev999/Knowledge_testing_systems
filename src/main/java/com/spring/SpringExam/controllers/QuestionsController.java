package com.spring.SpringExam.controllers;


import com.spring.SpringExam.models.Question;
import com.spring.SpringExam.repositories.IQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class QuestionsController {

    @Autowired
    IQuestionRepository questionRepository;



    @RequestMapping("/createQuestion")
    public String createQuestion( Model model, HttpServletRequest httpRequest) {
        List<Question> questions = (List<Question>) questionRepository.findAll();
        if (!questions.isEmpty())
        model.addAttribute("questions",questions);
        return "question/createQuestion";
    }

    @RequestMapping("/saveQuestion")
    public String saveQuestion(@RequestParam String question, Model model, HttpServletRequest httpRequest) {

       List<Question> questions = (List<Question>) questionRepository.findAll();
       Boolean isHave = questions.stream().anyMatch(i->i.getName().equals(question));
       if (!isHave){
           Question ques = new Question(question);
           questionRepository.save(ques);
       }else{
           model.addAttribute("error", "This question is have");
       }

        questions = (List<Question>) questionRepository.findAll();
        if (!questions.isEmpty())
            model.addAttribute("questions",questions);

        return "question/createQuestion";
    }

    @RequestMapping("/removeQuestion")
    public String removeQuestion(@RequestParam Long id, Model model, HttpServletRequest httpRequest) {
        questionRepository.deleteById(id);
        return "redirect:/createQuestion";
    }

    @RequestMapping("/createNewQuestion")
    public String createNewQuestion(Model model, HttpServletRequest httpRequest) {
        List<Question> questions = (List<Question>) questionRepository.findAll();
        if (!questions.isEmpty())
            model.addAttribute("questions",questions);

        model.addAttribute("newQuestion","newQuestion");
        return "question/createQuestion";
    }

    @RequestMapping("/updateQuestion")
    public String updateQuestion(@RequestParam Long id,  Model model, HttpServletRequest httpRequest) {

        List<Question> questions = (List<Question>) questionRepository.findAll();
        if (!questions.isEmpty())
            model.addAttribute("questions",questions);

        model.addAttribute("question" , questionRepository.getQuestionById(id));
        model.addAttribute("editQuestion" ,"editQuestion");
        return "question/createQuestion";
    }




    @RequestMapping("/editQuestion")
    public String editQuestion(@ModelAttribute Question question, Model model, HttpServletRequest httpRequest) {

        List<Question> questions = (List<Question>) questionRepository.findAll();
        Boolean isHave = questions.stream().anyMatch(i->i.getName().equals(question.getName()));
        if (isHave){
            model.addAttribute("error", "This question is have");
        }else{
            questionRepository.save(question);
        }

        questions = (List<Question>) questionRepository.findAll();
        if (!questions.isEmpty())
            model.addAttribute("questions",questions);
        return "question/createQuestion";
    }
}
