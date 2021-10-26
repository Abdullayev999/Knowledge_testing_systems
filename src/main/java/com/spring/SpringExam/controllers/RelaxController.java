package com.spring.SpringExam.controllers;


import com.spring.SpringExam.models.Category;
import com.spring.SpringExam.repositories.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class RelaxController {

    @RequestMapping("/paint")
    public String paint( Model model, HttpServletRequest httpRequest) { return "paint"; }

    @RequestMapping("/searchMovie")
    public String searchMovie( Model model, HttpServletRequest httpRequest) {
        return "searchMovie";
    }

    @RequestMapping("/shooterGame")
    public String shooterGame( Model model, HttpServletRequest httpRequest) {
        return "shooterGame";
    }

    @RequestMapping("/weather")
    public String weather( Model model, HttpServletRequest httpRequest) {
        return "weather";
    }

}
