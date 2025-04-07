package com.ecom.Exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.List;

@ControllerAdvice
public class GlobalException {

    List<String> exceptionTypes = List.of("SellerException",
            "ProductException", "OrderException", "PaymentExceptions", "UserExceptions", "ReviewExceptions" , "DealExceptions");

    @ExceptionHandler({SellerException.class, ProductException.class,
            OrderException.class, PaymentExceptions.class, UserExceptions.class, ReviewExceptions.class , DealExceptions.class})
    public ResponseEntity<ErrorDetails> ExceptionHandler(Exception ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails();

        String simpleName = ex.getClass().getSimpleName();

        if (exceptionTypes.contains(simpleName)) {
            errorDetails.setError(ex.getMessage());
        } else {
            errorDetails.setError("Unhandled Exception: " + ex.getClass().getName() +" : "+ ex.getMessage());
        }

        errorDetails.setTimestamp(LocalDateTime.now());
        errorDetails.setDetails(request.getDescription(false));

        return ResponseEntity.badRequest().body(errorDetails);
    }

}
