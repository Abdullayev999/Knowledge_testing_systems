package com.spring.SpringExam.repositories;

import com.spring.SpringExam.models.AppRole;
import org.springframework.data.repository.CrudRepository;

public interface IRoleRepository extends CrudRepository<AppRole,Long> {
    AppRole getAppRoleByRoleName(String roleName);
}
