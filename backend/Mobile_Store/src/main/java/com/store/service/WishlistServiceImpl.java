package com.store.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.dao.CustomerDao;
import com.store.dao.ProductDao;
import com.store.dao.WishlistDao;
import com.store.dto.ApiResponse;
import com.store.dto.WishlistDto;

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
	    public String addToWishlist(WishlistDto wishlistDto) {
	    	
	    	Customer customer = customerDao.findById(wishlistDto.getCustomerId()).orElseThrow();
	    	
	    	Product product = productDao.findById(wishlistDto.getProductId()).orElseThrow();
	    	
	    	Wishlist wishlist= modelMapper.map(wishlistDto, Wishlist.class);
	    	wishlist.setCustomer(customer);
	    	wishlist.setProduct(product);
	    	
	    	wishlistDao.save(wishlist);
	    	
	    	
	    	return "Saved in wishlist!!!";
	    }

		@Override
		public ApiResponse deletefromWishlistById(Long wishlistId) {
		     
//			Wishlist wishlist= wishlistDao.findById(wishlistId).orElseThrow();
			
			wishlistDao.deleteById(wishlistId);
			
			return new ApiResponse("successs","removed from Wishlist");
		}
		 @Override
		    public List<WishlistDto> getWishlistByCustomer(Long customerId) {
		        Customer customer = customerDao.findById(customerId).orElseThrow();
		        return wishlistDao.findByCustomer(customer).stream()
		                .map(wishlist -> modelMapper.map(wishlist, WishlistDto.class))
		                .collect(Collectors.toList());
		    }

 }

	


