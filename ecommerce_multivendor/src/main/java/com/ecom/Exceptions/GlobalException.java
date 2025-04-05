package com.ecom.Exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(SellerException.class)
    public ResponseEntity<?> sellerExceptionHandler(SellerException ex ,
                                                    WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(ex.getMessage());
        errorDetails.setTimestamp(LocalDateTime.now());
        errorDetails.setDetails(request.getDescription(false));
        return ResponseEntity.badRequest().body(errorDetails);
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<?> productExceptionHandler(ProductException ex ,
                                                    WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(ex.getMessage());
        errorDetails.setTimestamp(LocalDateTime.now());
        errorDetails.setDetails(request.getDescription(false));
        return ResponseEntity.badRequest().body(errorDetails);
    }

}
