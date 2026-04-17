package com.jsp.library.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.jsp.library.entity.Issue;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class IssueDAO {
	private final EntityManager entityManager;
	
	public void saveIssue(Issue issue) {
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.persist(issue);
		transaction.commit();
	}
	
	public Issue fetchIssueById(int id) {
		return entityManager.find(Issue.class, id);
	}
	
	public List<Issue> fetchAllIssue(){
		return entityManager.createQuery("select i from Issue i",Issue.class).getResultList();
	}
	
	public void updateIssue(Issue issue) {
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.merge(issue);
		transaction.commit();
	}
	
	public Issue findActiveIssue(int bookId, int studentId) {
		Query query = entityManager.createQuery("select i from Issue i where i.student.id = :sid AND i.book.id=:bid AND i.status = 'ISSUED'",Issue.class);
		query.setParameter("sid", studentId);
		query.setParameter("bid", bookId);
		List<Issue> list = query.getResultList();
		return list.isEmpty() ? null : list.get(0);
	}
}
