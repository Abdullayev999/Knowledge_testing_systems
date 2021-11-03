package com.spring.SpringExam.controllers;


import com.spring.SpringExam.models.Answer;
import com.spring.SpringExam.models.Category;
import com.spring.SpringExam.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class CategoriesController {

    @Autowired
    ICategoryRepository categoryRepository ;



    @RequestMapping("/createCategory")
    public String createCategory( Model model, HttpServletRequest httpRequest) {
        List<Category> categories = (List<Category>) categoryRepository.findAll();
        if (!categories.isEmpty())
            model.addAttribute("categories",categories);
        return "category/createCategory";
    }

    @RequestMapping("/saveCategory")
    public String saveCategory(@RequestParam String category,@RequestParam String description, Model model, HttpServletRequest httpRequest) {

        List<Category> categories = (List<Category>) categoryRepository.findAll();
        Boolean isHave = categories.stream().anyMatch(i->i.getName().equals(category));
        if (!isHave){
            Category cat = new Category(category,description);
            categoryRepository.save(cat);
        }else{
            model.addAttribute("error", "This category is have");
        }

        categories = (List<Category>) categoryRepository.findAll();
        if (!categories.isEmpty())
            model.addAttribute("categories",categories);

        return "category/createCategory";
    }

    @RequestMapping("/removeCategory")
    public String removeCategory(@RequestParam Long id, Model model, HttpServletRequest httpRequest) {
        categoryRepository.deleteById(id);
        return "redirect:/createCategory";
    }

    @RequestMapping("/createNewCategory")
    public String createNewCategory(Model model, HttpServletRequest httpRequest) {
        List<Category> categories = (List<Category>) categoryRepository.findAll();
        if (!categories.isEmpty())
            model.addAttribute("categories",categories);

        model.addAttribute("newCategory","newCategory");
        return "category/createCategory";
    }

    @RequestMapping("/updateCategory")
    public String updateCategory(@RequestParam Long id,  Model model, HttpServletRequest httpRequest) {

        List<Category> categories = (List<Category>) categoryRepository.findAll();
        if (!categories.isEmpty())
            model.addAttribute("categories",categories);

        model.addAttribute("category" ,categoryRepository.getCategoryById(id));
        model.addAttribute("editCategory" ,"editCategory");
        return "category/createCategory";
    }



    @RequestMapping("/editCategory")
    public String editCategory(@ModelAttribute Category category, Model model, HttpServletRequest httpRequest) {

        List<Category> categories = (List<Category>) categoryRepository.findAll();
        Boolean isHaveName = categories.stream().anyMatch(i->i.getName().equals(category.getName()));
        Boolean isHaveDescription = categories.stream().anyMatch(i->i.getDescription().equals(category.getDescription()));
        if (isHaveName && isHaveDescription){
            model.addAttribute("error", "This category is have");
        }else{
            categoryRepository.save(category);
        }

        categories = (List<Category>) categoryRepository.findAll();
        if (!categories.isEmpty())
            model.addAttribute("categories",categories);
        return "category/createCategory";
    }


}
