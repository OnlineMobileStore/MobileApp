package com.store.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.dao.CustomerDao;
import com.store.dao.ProductDao;
import com.store.dao.WishlistDao;
import com.store.dto.ApiResponse;
import com.store.dto.CartDTO;
import com.store.dto.WishlistDto;
import com.store.pojo.Cart;
import com.store.pojo.Customer;
import com.store.pojo.Product;
import com.store.pojo.Wishlist;


@Service
@Transactional
public class WishlistServiceImpl implements WishlistService {

	  @Autowired
	    private CustomerDao customerDao;

	    @Autowired
	    private ProductDao productDao;

	    @Autowired
	    private WishlistDao wishlistDao;

//	    @Autowired
//	    private WishlistItemDao wishlistItemDao;

	    @Autowired
	    private ModelMapper modelMapper;

	    @Override
	    public ApiResponse addToWishlist(WishlistDto wishlistDto) {
	    	
	    	Optional<Customer> customer = customerDao.findById(wishlistDto.getCustomerId());
	        Optional<Product> product = productDao.findById(wishlistDto.getProductId());
	    	
	    	if (customer.isEmpty() || product.isEmpty()) {
	            return new ApiResponse("error", "Invalid customer or product ID");
	        }

	        Optional<Wishlist> existingWishList = wishlistDao.findByCustomerIdAndProductId(wishlistDto.getCustomerId(), wishlistDto.getProductId());

	        if (existingWishList.isPresent()) {
	            return new ApiResponse("error", "Product already in wishlist");
	        }
	    	
	    	Wishlist wishlist= modelMapper.map(wishlistDto, Wishlist.class);
	    	wishlist.setCustomer(customer.get());
	    	wishlist.setProduct(product.get());
	    	
	    	wishlistDao.save(wishlist);
	  
	    	return new ApiResponse("success", "added to wishlist");
	    }

		@Override
		public ApiResponse deletefromWishlistById(Long wishlistId) {
		     
//			Wishlist wishlist= wishlistDao.findById(wishlistId).orElseThrow();
			
			wishlistDao.deleteById(wishlistId);
			
			return new ApiResponse("successs","removed from Wishlist");
		}
   

	    @Override
	    public List<WishlistDto> getWishlistByCustomer(Long customerId) {
	    	return wishlistDao.findByCustomerId(customerId)
	        		.stream()
	        		.map(wishlist->{
	        			WishlistDto dto=modelMapper.map(wishlist, WishlistDto.class);
	        			dto.setCustomerId(wishlist.getCustomer().getId());
	                    dto.setProductId(wishlist.getProduct().getId()); 
	                    dto.setProductName(wishlist.getProduct().getTitle());
	                    dto.setProductImage(wishlist.getProduct().getPrimaryImage());
	                    dto.setDiscount(wishlist.getProduct().getDiscount());
	                    dto.setPrice(wishlist.getProduct().getPrice());
	                    dto.setQuantity(wishlist.getProduct().getQuantity());
	                    
	        			return dto;
	        		}).collect(Collectors.toList());
	    }
	    
 }

	


