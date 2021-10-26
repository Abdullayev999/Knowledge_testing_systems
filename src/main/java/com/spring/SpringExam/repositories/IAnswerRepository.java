package com.spring.SpringExam.repositories;


import com.spring.SpringExam.models.Answer;
import org.springframework.data.repository.CrudRepository;

public interface IAnswerRepository extends CrudRepository<Answer, Long> {
    Answer getAnswerById(Long id);
    Answer getAnswerByName(String name);
}