package com.jsp.library.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.jsp.library.entity.Student;
import com.jsp.library.service.StudentService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class StudentController {
	private final StudentService studentService; 
	
	@GetMapping("addStudentPage")
	public String displayAddStudentPage() {
		return "add-student";
	}
	
	@PostMapping("addStudent")
	public String addStudent(@ModelAttribute Student student) {
		studentService.saveStudent(student);
		return "redirect:/books";
	}
}
