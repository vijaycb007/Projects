package com.jsp.library.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import org.springframework.stereotype.Repository;

import com.jsp.library.entity.Student;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class StudentDAO {
	private final EntityManager entityManager;
	
	public void saveStudent(Student student) {
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.persist(student);
		transaction.commit();
	}
	
	public Student fetchStduentById(int id) {
		return entityManager.find(Student.class, id);
	}
	
	public List<Student> fetchAll() {
		return entityManager.createQuery("select s from Student s",Student.class).getResultList();
	}
	
	public void updateStudent(Student student) {
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		entityManager.merge(student);
		transaction.commit();
	}
}
