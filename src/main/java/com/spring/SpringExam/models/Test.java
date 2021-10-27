package com.spring.SpringExam.models;


import javax.persistence.*;

@Entity
@Table(name = "Test")
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;


    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
     Category  category;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    Question  question;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "answer_id", nullable = false)
    Answer answer;

    @Column(name = "is_correct", length = 1, nullable = false)
    public Boolean isCorrect;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Test() {
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public Boolean getCorrect() {
        return isCorrect;
    }

    public void setCorrect(Boolean correct) {
        isCorrect = correct;
    }

    public Test(Category category, Question question, Answer answer, Boolean isCorrect) {
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.isCorrect = isCorrect;
        System.out.println("s");
    }
}
