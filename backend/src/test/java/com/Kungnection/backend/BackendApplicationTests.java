package com.Kungnection.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void basicAdditionTest() {
	    int result = 2 + 3;
	    assert(result == 5);
	}

}
