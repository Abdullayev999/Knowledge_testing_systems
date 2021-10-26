package com.spring.SpringExam.repositories;

import com.spring.SpringExam.models.Question;
import com.spring.SpringExam.models.Test;
import org.springframework.data.repository.CrudRepository;

import java.util.Map;

public interface ITestRepository extends CrudRepository<Test, Long> {
        Iterable<Test> getTestByCategoryId(Long id);
}
