package com.jsp.library.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Issue {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn
	private Book book;
	@ManyToOne
	@JoinColumn
	private Student student;
//	LocalDate is a inbuilt-class which will fetch the date of system
	private LocalDate issuedDate;
	private LocalDate returnedDate;
	private String status;
}
