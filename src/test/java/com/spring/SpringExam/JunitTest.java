package com.spring.SpringExam;


import com.spring.SpringExam.controllers.AnswersController;
import com.spring.SpringExam.controllers.MainController;
import com.spring.SpringExam.models.AppUser;
import com.spring.SpringExam.models.UserRole;
import com.spring.SpringExam.repositories.IUserRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
public class JunitTest {

    @Autowired
    IUserRepository userRepository;

    @Autowired
    AnswersController answersController;


    @Test
    public void contextLoadsController() {
        assertThat(answersController).isNotNull();
    }

    @Test
    void wrongIndex(){
       AppUser user =  userRepository.getByUserId(new Long(1));
       Assert.assertNotNull(user);
    }
}
