package com.spring.SpringExam.repositories;

import com.spring.SpringExam.models.Question;
import org.springframework.data.repository.CrudRepository;

public interface IQuestionRepository extends CrudRepository<Question, Long> {
    Question getQuestionById(Long id);
    Question getQuestionByName(String name);
}