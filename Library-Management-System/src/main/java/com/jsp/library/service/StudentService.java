package com.jsp.library.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsp.library.dao.StudentDAO;
import com.jsp.library.entity.Student;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentService {

	private final StudentDAO studentDao;

	public void saveStudent(Student student) {
		studentDao.saveStudent(student);
	}

	public Student fetchById(int id) {
		return studentDao.fetchStduentById(id);
	}
	
	public List<Student> fetchAll() {
		return studentDao.fetchAll();
	}
	
	public void updateStudent(Student student) {
		studentDao.updateStudent(student);
	}
}
