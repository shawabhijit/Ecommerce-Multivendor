package com.ecom.Controller;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.ReviewEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Request.CreateReviewRequest;
import com.ecom.Response.ApiResponse;
import com.ecom.Service.ProductService;
import com.ecom.Service.ReviewService;
import com.ecom.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<?> getReviewsByProductId(@PathVariable Long productId) throws Exception{
        List<ReviewEntity> reviews = reviewService.getReviewByProductId(productId);
        return ResponseEntity.ok().body(reviews);
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<?> writeReview (@RequestBody CreateReviewRequest req ,
                                          @PathVariable Long productId ,
                                          @RequestHeader("Authorization") String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        ProductEntity product = productService.findProductById(productId);

        ReviewEntity review = reviewService.createReview(req, user, product);

        return ResponseEntity.ok().body(review);
    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<?> updateReview (@PathVariable Long reviewId ,
                                           @RequestBody CreateReviewRequest req,
                                           @RequestHeader("Authorization") String jwt
    ) throws Exception{
        UserEntity user = userService.findUserByJwtToken(jwt);

        ReviewEntity review = reviewService.updateReview(reviewId,req.getReviewText(),req.getReviewRating(),user.getId());

        return ResponseEntity.ok().body(review);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview (@PathVariable Long reviewId , @RequestHeader("Authorization") String jwt) throws Exception{
        UserEntity user = userService.findUserByJwtToken(jwt);

        reviewService.deleteReview(reviewId,user.getId());
        ApiResponse res = new ApiResponse();
        res.setMessage("Review deleted Successfully.");
        res.setSuccess(true);

        return ResponseEntity.ok().body(res);
    }


}
