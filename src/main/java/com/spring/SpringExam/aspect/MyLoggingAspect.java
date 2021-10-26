package com.spring.SpringExam.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.LocalTime;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Component
@Aspect
public class MyLoggingAspect {

    private String path = "Logger.txt";
    @Around("(execution(* com.spring.SpringExam.controllers.*.*(..)))||(execution(* com.spring.SpringExam.controllers.*.*(..)))")
    public Object arroundAllRepositoryMethodsAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{


        try {
            MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
            String name = methodSignature.getName();
            Files.write(Paths.get(path),("Begin of method \" "+name + " \" "+ new LocalDate()+"  "+new LocalTime() +"\n").getBytes(), StandardOpenOption.APPEND);
            Files.write(Paths.get(path),("End of method \" "+name + " \" "+ new LocalDate()+"  "+new LocalTime() +"\n").getBytes(), StandardOpenOption.APPEND);
            Files.write(Paths.get(path), "\n-------------------------------------\n".getBytes(), StandardOpenOption.APPEND);
        }catch (IOException e) {
            Files.write(Paths.get(path),("Error : \" "+e.getMessage() + " \" "+ new LocalDate() +"\n").getBytes(), StandardOpenOption.APPEND);
        } Object targetResult = proceedingJoinPoint.proceed();

       return  targetResult;
    }
}