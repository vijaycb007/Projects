package com.jsp.library.service;

import com.jsp.library.entity.Book;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsp.library.dao.BookDAO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookService {
	private final BookDAO bookDao;
	
	public void saveBook(Book book) {
		bookDao.saveBook(book);
	}
	
	public Book fetchBookById(int id){
		return bookDao.findBookById(id);
	}
	
	public List<Book> fetchAllBook() {
		return bookDao.fetchAllBook();
	}
	
	public void updateBook(Book book) {
		bookDao.updateBook(book);
	}
}
