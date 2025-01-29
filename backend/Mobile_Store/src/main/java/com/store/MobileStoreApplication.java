package com.store;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MobileStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(MobileStoreApplication.class, args);
	}
	
//	@Bean
//	public ModelMapper modelMapper() {
//		ModelMapper mapper = new ModelMapper(); // creating empty model mapper
//		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)// prop names n data type must match
//																				// between src n dest
//				.setPropertyCondition(Conditions.isNotNull());// DO NOT transfer nulls from src ->dest
//		return mapper;
//	}
	
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper model = new ModelMapper();
		model.getConfiguration()
        .setFieldMatchingEnabled(true)
        .setMatchingStrategy(MatchingStrategies.STRICT) // Property names and data types must match
        .setPropertyCondition(Conditions.isNotNull())   // Ignore null values
        .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
		
		return model;
	}

}
