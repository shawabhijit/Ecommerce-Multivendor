package com.ecom.Controller;

import com.ecom.Entity.AddressEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserEntity> getUser (@CookieValue(name = "jwt" , required = false) String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("{email}")
    public ResponseEntity<?> findByEmail (@PathVariable String email) throws Exception {
        UserEntity user = userService.findUserByEmail(email);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/profile/update")
    public ResponseEntity<?> updateUser (@RequestBody UserEntity user , @CookieValue(name = "jwt" , required = false) String jwt) throws Exception {
        UserEntity oldUser = userService.findUserByJwtToken(jwt);
        oldUser = userService.updateUser(user,oldUser.getId());
        return ResponseEntity.ok().body(oldUser);
    }

    @PatchMapping("/profile/update/address")
    public ResponseEntity<?> updateUserAddress (@RequestBody AddressEntity address , @CookieValue(name = "jwt" , required = false) String jwt) throws Exception {
        UserEntity oldUser = userService.findUserByJwtToken(jwt);
        oldUser = userService.updateUserAddress(address,oldUser.getId());
        return ResponseEntity.ok().body(oldUser);
    }

}
