package com.store.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generates a secure key
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // Token valid for 10 hours

    // Generate a JWT token
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }



	public String extractUsername(String token) {
		// TODO Auto-generated method stub
		return null;
	}
}


//package com.store.util;
//
//import java.security.Key;
//import java.util.Collection;
//import java.util.Date;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.stereotype.Component;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import jakarta.annotation.PostConstruct;
//import lombok.extern.slf4j.Slf4j;
//
//@Component
//@Slf4j
//public class JwtUtil {
//
//	@Value("${jwt.secret.key}") 
//	private String jwtSecret;
//
//	@Value("${jwt.expiration.time}")
//	private int jwtExpirationMs;
//	
//	
//	private Key key;
//
//	@PostConstruct
//	public void init() {
//		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
//	}
//
//	public String generateJwtToken(Authentication authentication) {
//		log.info("generate jwt token " + authentication);
//		CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
//		return Jwts.builder() 
//				.setSubject((userPrincipal.getUsername())) 
//				.setIssuedAt(new Date())
//				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
//				.signWith(key, SignatureAlgorithm.HS512) 
//				.compact();
//	}
//
//	public String getUserNameFromJwtToken(Claims claims) {
//		return claims.getSubject();
//	}
//
//	public Claims validateJwtToken(String jwtToken) {
//		Claims claims = Jwts.parserBuilder() 
//				.setSigningKey(key) 
//				.build()
//				.parseClaimsJws(jwtToken) 
//				.getBody();
//		return claims;		
//	}
//
//	private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
//		String authorityString = authorities.stream().
//				map(authority -> authority.getAuthority())
//				.collect(Collectors.joining(","));
//		System.out.println(authorityString);
//		return authorityString;
//	}
//
//		public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
//		String authString = (String) claims.get("authorities");
//		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
//		authorities.forEach(System.out::println);
//		return authorities;
//	}
//			public Long getUserIdFromJwtToken(Claims claims) {
//				return Long.valueOf((int)claims.get("user_id"));			
//			}
//			
//			public Authentication populateAuthenticationTokenFromJWT(String jwt) {
//				Claims payloadClaims = validateJwtToken(jwt);
//				String email = getUserNameFromJwtToken(payloadClaims);
//				
//				List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
//				UsernamePasswordAuthenticationToken token = 
//						new UsernamePasswordAuthenticationToken(email,null,
//						authorities);
//				System.out.println("is authenticated "+token.isAuthenticated());
//				return token;
//		
//			}
//
//}

