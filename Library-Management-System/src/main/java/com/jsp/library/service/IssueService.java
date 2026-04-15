package com.jsp.library.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jsp.library.dao.BookDAO;
import com.jsp.library.dao.IssueDAO;
import com.jsp.library.dao.StudentDAO;
import com.jsp.library.entity.Book;
import com.jsp.library.entity.Issue;
import com.jsp.library.entity.Student;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class IssueService {
	private final BookDAO bookDao;
	private final StudentDAO studentDao;
	private final IssueDAO issueDao;

//	Checking whether both book and student present in DB
	public void saveIssue(int bookId, int studentId) {
		Book book = bookDao.findBookById(bookId);
		Student student = studentDao.fetchStduentById(studentId);

		if (book == null || student == null) {
			System.out.println("Invalid student or book");
			return;
		}

//		checking whether the student or the book is already issued to the same student or not
		Issue activeIssue = issueDao.findActiveIssue(bookId, studentId);

		if (activeIssue != null) {
			System.out.println("Book is already issued to student");
			return;
		}

//		Checking if the copies are available or not
		if (book.getAvailableCopies() > 0) {
			Issue issue = new Issue();
			issue.setBook(book);
			issue.setStudent(student);
			issue.setIssuedDate(LocalDate.now());
			issue.setStatus("ISSUED");
			book.setAvailableCopies(book.getAvailableCopies() - 1);
			issueDao.saveIssue(issue);
			bookDao.updateBook(book);
		}
	}

	public List<Issue> fetchAllIssues() {
		return issueDao.fetchAllIssue();
	}

	public Issue findIssueById(int id) {
		return issueDao.fetchIssueById(id);
	}

	public void returnBook(int id) {
		Issue issue = issueDao.fetchIssueById(id);
		if (issue == null) {
			return;
		}
		issue.setReturnedDate(LocalDate.now());
		issue.setStatus("RETURNED");
		Book book = issue.getBook();
		book.setAvailableCopies(book.getAvailableCopies() + 1);
		issueDao.updateIssue(issue);
		bookDao.updateBook(book);
	}
}
