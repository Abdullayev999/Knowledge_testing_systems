package com.spring.SpringExam.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class RelaxController {

    @RequestMapping("/paint")
    public String paint( Model model, HttpServletRequest httpRequest) { return "relax/paint"; }

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
