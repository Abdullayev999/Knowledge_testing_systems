package com.spring.SpringExam.repositories;

import com.spring.SpringExam.models.AppUser;
import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends CrudRepository<AppUser,Long> {
    AppUser getByUserId(Long id);
    void deleteById(Long id);
    public AppUser findByUserName(String userName);
}
