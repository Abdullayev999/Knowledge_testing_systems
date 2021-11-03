package com.spring.SpringExam.repositories;

import com.spring.SpringExam.models.Answer;
import com.spring.SpringExam.models.Score;
import com.spring.SpringExam.models.UserRole;
import org.springframework.data.repository.CrudRepository;

public interface IScoreRepository  extends CrudRepository<Score, Long> {

    Iterable<Score> getAllByUserRole(UserRole userRole);
}
