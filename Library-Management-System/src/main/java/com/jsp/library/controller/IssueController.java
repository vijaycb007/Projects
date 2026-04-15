package com.jsp.library.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jsp.library.entity.Book;
import com.jsp.library.entity.Issue;
import com.jsp.library.entity.Student;
import com.jsp.library.service.BookService;
import com.jsp.library.service.IssueService;
import com.jsp.library.service.StudentService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class IssueController {
	private final IssueService issueService;
	private final BookService bookService; 
	private final StudentService studentService;
	
	@GetMapping("issuePage")
	public String displayIssueBookPage(@RequestParam("id") int id, Model model) {
		Book book = bookService.fetchBookById(id);
		List<Student> list = studentService.fetchAll();
		model.addAttribute("book",book);
		model.addAttribute("list",list);
		return "issue-book";
	}
	
	@PostMapping("issueBook")
	public String issueBook(@RequestParam("bookId") int bookId, @RequestParam("studentId") int studentId) {
		issueService.saveIssue(bookId, studentId);
		return "redirect:/books";
	}
	
	@GetMapping("issueDetails")
	public String displayIssueDetails(Model model) {
		List<Issue> list = issueService.fetchAllIssues();
		model.addAttribute("list",list);
		return "issue-details";
	}
	
	@GetMapping("returnBook")
	public String returnBook(@RequestParam("id") int id) {
		issueService.returnBook(id);
		return "redirect:/books";
	}
}
