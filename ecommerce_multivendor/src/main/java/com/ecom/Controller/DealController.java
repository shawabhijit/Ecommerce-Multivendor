package com.ecom.Controller;

import com.ecom.Entity.DealEntity;
import com.ecom.Exceptions.DealExceptions;
import com.ecom.Response.ApiResponse;
import com.ecom.Service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealController {
    private final DealService dealService;

    @PostMapping
    public ResponseEntity<?> createDeals (@RequestBody DealEntity deal) throws DealExceptions {
        DealEntity createDeals = dealService.createDeal(deal);
        return ResponseEntity.accepted().body(createDeals);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateDeal(@PathVariable Long id, @RequestBody DealEntity deal) throws DealExceptions {
        DealEntity newDeal = dealService.updateDeal(deal, id);
        return ResponseEntity.ok().body(newDeal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeals (@PathVariable Long id) throws DealExceptions {
        dealService.deleteDeal(id);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Deal deleted successfully");

        return ResponseEntity.accepted().body(apiResponse);
    }
}
