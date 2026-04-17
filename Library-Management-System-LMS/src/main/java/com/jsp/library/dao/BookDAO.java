package com.jsp.library.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import org.springframework.stereotype.Repository;

import com.jsp.library.entity.Book;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class BookDAO {
	private final EntityManager entityManager;
	
	public void saveBook(Book book) {
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.persist(book);
		transaction.commit();
	}
	
	public Book findBookById(int id) {
		return entityManager.find(Book.class, id);
	}
	
//	Fetch All means create a JPQL query
	public List<Book> fetchAllBook() {
//		Query query = entityManager.createQuery("select b from Book b" , Book.class);
//		List<Book> list = query.getResultList();
//		return list;
		return entityManager.createQuery("select b from Book b" , Book.class).getResultList();
	}
	
	public void updateBook(Book book) {
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.merge(book);
		transaction.commit();
	}
}
