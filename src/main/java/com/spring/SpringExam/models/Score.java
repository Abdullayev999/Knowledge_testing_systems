package com.spring.SpringExam.models;

import javax.persistence.*;

@Entity
@Table(name = "Score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;


    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
     Category  category;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "user_role_id", nullable = false)
    UserRole userRole;

    @JoinColumn(name = "count_question", nullable = false)
    int countQuestion;

    @JoinColumn(name = "count_correct_question", nullable = false)
    int countCorrectQuestion;
    @JoinColumn(name = "grade", nullable = false)
    float grade;

    public Score() {
    }

    public Score(Category category, UserRole userRole, int countQuestion, int countCorrectQuestion, float grade) {
        this.category = category;
        this.userRole = userRole;
        this.countQuestion = countQuestion;
        this.countCorrectQuestion = countCorrectQuestion;
        this.grade = grade;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public int getCountQuestion() {
        return countQuestion;
    }

    public void setCountQuestion(int countQuestion) {
        this.countQuestion = countQuestion;
    }

    public int getCountCorrectQuestion() {
        return countCorrectQuestion;
    }

    public void setCountCorrectQuestion(int countCorrectQuestion) {
        this.countCorrectQuestion = countCorrectQuestion;
    }

    public float getGrade() {
        return grade;
    }

    public void setGrade(float grade) {
        this.grade = grade;
    }
}
