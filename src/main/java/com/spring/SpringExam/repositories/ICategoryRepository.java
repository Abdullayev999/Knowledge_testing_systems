package com.spring.SpringExam.repositories;


import com.spring.SpringExam.models.Answer;
import com.spring.SpringExam.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface ICategoryRepository extends CrudRepository<Category, Long> {
    Category getCategoryById(Long id);
    Category getCategoryByName(String name);
}