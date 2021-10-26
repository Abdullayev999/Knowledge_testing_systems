package com.spring.SpringExam.repositories;

import com.spring.SpringExam.models.Answer;
import com.spring.SpringExam.models.Score;
import org.springframework.data.repository.CrudRepository;

public interface IScoreRepository  extends CrudRepository<Score, Long> {

}
