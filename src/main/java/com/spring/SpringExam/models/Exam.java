package com.spring.SpringExam.models;

import java.util.Map;

public class Exam {
    private Category category;
    private Map<Question, Map<Answer, Boolean>> questionsWithAnswers;

    public Exam() {
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Map<Question, Map<Answer, Boolean>> getQuestionsWithAnswers() {
        return questionsWithAnswers;
    }

    public void setQuestionsWithAnswers(Map<Question, Map<Answer, Boolean>> questionsWithAnswers) {
        this.questionsWithAnswers = questionsWithAnswers;
    }

    public Exam(Category category, Map<Question, Map<Answer, Boolean>> questionsWithAnswers) {
        this.category = category;
        this.questionsWithAnswers = questionsWithAnswers;
    }
}
