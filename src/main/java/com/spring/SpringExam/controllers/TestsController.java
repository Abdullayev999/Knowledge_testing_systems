package com.spring.SpringExam.controllers;

import com.spring.SpringExam.models.*;
import com.spring.SpringExam.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class TestsController {

    @Autowired
    IAnswerRepository answerRepository;
    @Autowired
    IQuestionRepository questionRepository;
    @Autowired
    ICategoryRepository categoryRepository;
    @Autowired
    ITestRepository testRepository;
    @Autowired
    IScoreRepository scoreRepository;
    @Autowired
    IUserRepository userRepository;
    @Autowired
    IUserRoleRepository userRoleRepository;

    @RequestMapping("/createTest")
    public String createTest(Model model, HttpServletRequest httpRequest) {

        List<Category> categories = (List<Category>) categoryRepository.findAll();
        if (!categories.isEmpty()) {
            model.addAttribute("categories", categories);
        }

        List<Question> questions = (List<Question>) questionRepository.findAll();
        if (!questions.isEmpty()) {
            model.addAttribute("questions", questions);
        }

        List<Answer> answers = (List<Answer>) answerRepository.findAll();
        if (!answers.isEmpty()) {
            model.addAttribute("answers", answers);
        }
        return "test/createTest";
    }

    @RequestMapping("/saveTest")
    public String saveTest(@RequestParam Map<String, String> searchParams, Model model, HttpServletRequest httpRequest) {


        //Category category = categoryRepository.getCategoryByName()
       /* System.out.println("\n1\n1\n1\n1" );
        System.out.println(httpRequest.getParameter("Option1"));
        System.out.println(httpRequest.getParameter("Option2"));
        System.out.println(httpRequest.getParameter("Option3"));
        System.out.println(httpRequest.getParameter("Option4"));
        System.out.println(httpRequest.getParameter("Option5"));
        System.out.println(httpRequest.getParameter("Category"));
        System.out.println(httpRequest.getParameter("Question"));
        System.out.println(httpRequest.getParameter("IsCorrect"));*/

        //System.out.println("\n1\n1\n1\n1\n" + searchParams);

        //System.out.println();

        Category category = categoryRepository.getCategoryByName(httpRequest.getParameter("Category"));
        Question question = questionRepository.getQuestionByName(httpRequest.getParameter("Question"));


        boolean isCorrect = false;
        for (Map.Entry<String, String> entry : searchParams.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            Test test = new Test();
            if (isCorrect) {
                if (key.startsWith("Option")) {

                    Answer answer = answerRepository.getAnswerByName(value);
                    test.setAnswer(answer);
                    test.setCategory(category);
                    test.setCorrect(isCorrect);
                    test.setQuestion(question);

                    testRepository.save(test);
                    isCorrect = false;
                }
            } else {
                if (key.startsWith("Option")) {
                    Answer answer = answerRepository.getAnswerByName(value);
                    test.setAnswer(answer);
                    test.setCategory(category);
                    test.setCorrect(isCorrect);
                    test.setQuestion(question);

                    testRepository.save(test);
                } else if (key.equals("IsCorrect")) {
                    isCorrect = true;
                }
            }

            System.out.println("Key = " + key + "\t:\tValue = " + value);
        }
        // System.out.println("\n1\n1\n1\n1");
        return "redirect:/allTest";
    }


    @RequestMapping("/allTest")
    public String allTest(Model model, HttpServletRequest httpRequest) {

        List<Test> tests = (List<Test>) testRepository.findAll();
        model.addAttribute("tests", tests);
        return "test/allTest";
    }

    @RequestMapping("/statistic")
    public String statistic(Model model, HttpServletRequest httpRequest) {

        List<Score> scores = (List<Score>) scoreRepository.findAll();
        if (!scores.isEmpty())
        model.addAttribute("scores", scores);
        return "test/statistic";
    }

    @RequestMapping("/doTesting")
    public String doTesting(Model model, HttpServletRequest httpRequest) {
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!!11\n");
        List<Category> categories = (List<Category>) categoryRepository.findAll();
        if (!categories.isEmpty())
            model.addAttribute("categories", categories);

        for (int i = 0; i < categories.size(); i++) {
            System.out.println(categories.get(i).getName());
        }

        return "test/doTesting";
    }

    @RequestMapping("/startTest")
    public String startTest(@RequestParam Long id, Model model, HttpServletRequest httpRequest) {

        List<Test> test = (List<Test>) testRepository.getTestByCategoryId(id);

        Exam exam = GenerationExam((List<Test>) testRepository.findAll(), categoryRepository.getCategoryById(id));
        model.addAttribute("exam", exam);
        model.addAttribute("CategoryId", id);
        //      List<Test> tests =
        return "test/doTesting";
    }

    @RequestMapping("/checkTest")
    public String checkTest(@RequestParam Map<String, String> searchParams, Model model, HttpServletRequest httpRequest) {
        int count = 0;
        int size = -1;
        for (Map.Entry<String, String> entry : searchParams.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            size++;
            if (Boolean.parseBoolean(value)) {
                count++;
            }
            System.out.println("Key = " + key + "\t:\tValue = " + value);
        }
        //      List<Test> tests =

        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    float answer = (float) count/size;
        float grade =   answer*100;

        System.out.println(grade);
        System.out.println(categoryRepository.getCategoryById(Long.parseLong(httpRequest.getParameter("CategoryId"))));
        // System.out.println(getCurrentUser().getUserName());
        System.out.println(size);
        System.out.println(count);
        Score score = new Score(
                categoryRepository.getCategoryById(Long.parseLong(httpRequest.getParameter("CategoryId"))),
                getCurrentUser(),
                size,
                count,
                grade);
if (score.getUserRole()!=null){
    scoreRepository.save(score);
}else{
    model.addAttribute("error", "Register to save your details");
}
        List<Score> scores = (List<Score>) scoreRepository.findAll();
        if (!scores.isEmpty())
            model.addAttribute("scores", scores);

        return "test/statistic";
    }

    public UserRole getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRoleRepository.getUserRoleByAppUser(userRepository.findByUserName(authentication.getName()));
    }

    public Exam GenerationExam(List<Test> test, Category category) {
        Exam exam = new Exam();
        exam.setCategory(category);
        exam.setQuestionsWithAnswers(new HashMap<>());
        Map<Long, List<Test>> ex = new HashMap<>();

        for (int i = 0; i < test.size(); i++) {
            if ((test.get(i).getCategory().equals(category))) {
                if (ex.containsKey(test.get(i).getQuestion().getId())) {
                    exam.getQuestionsWithAnswers().get(test.get(i).getQuestion()).put(test.get(i).getAnswer(), test.get(i).isCorrect);


                    ex.get(test.get(i).getQuestion().getId()).add(test.get(i));
                } else {
                    exam.getQuestionsWithAnswers().put(test.get(i).getQuestion(), new HashMap<>());
                    exam.getQuestionsWithAnswers().get(test.get(i).getQuestion()).put(test.get(i).getAnswer(), test.get(i).isCorrect);

                    ex.put(test.get(i).getQuestion().getId(), new ArrayList<>());
                    ex.get(test.get(i).getQuestion().getId()).add(test.get(i));
                }
            }
        }


        for (Map.Entry<Long, List<Test>> entry : ex.entrySet()) {
            Long key = entry.getKey();
            List<Test> values = entry.getValue();

            System.out.println(questionRepository.getQuestionById(key).getName());
            for (int i = 0; i < values.size(); i++) {
                System.out.println(values.get(i).getAnswer().getName());
                System.out.println(values.get(i).isCorrect);
            }
            System.out.println("-------------------------------------");
        }
        System.out.println("-------------------------------------");
        System.out.println("-------------------------------------");
        for (Map.Entry<Question, Map<Answer, Boolean>> entry : exam.getQuestionsWithAnswers().entrySet()) {
            Question key = entry.getKey();
            Map<Answer, Boolean> values = entry.getValue();

            System.out.println(key.getName());
            int num = 1;
            for (Map.Entry<Answer, Boolean> entry2 : values.entrySet()) {
                Answer key2 = entry2.getKey();
                Boolean value2 = entry2.getValue();

                System.out.println(num++ + " " + key2.getName() + "\t" + value2);
            }
            System.out.println("-------------------------------------");
        }

        return exam;

    }


}


