package com.spring.SpringExam.repositories;

import com.spring.SpringExam.models.AppUser;
import com.spring.SpringExam.models.UserRole;
import org.springframework.data.repository.CrudRepository;

public interface IUserRoleRepository extends CrudRepository<UserRole,Long> {
    void deleteByAppUserUserId(Long id);
    UserRole getUserRoleByAppUser(AppUser appUser);

}
