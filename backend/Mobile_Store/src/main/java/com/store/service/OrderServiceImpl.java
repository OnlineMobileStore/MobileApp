package com.store.service;
import com.store.dto.ApiResponse;
import com.store.dto.CustomerOrdersResponseDTO;
import com.store.dto.OrderItemDTO;
import com.store.dto.OrderRequestDTO;
import com.store.dto.OrderResponseCustDTO;
import com.store.dto.OrderStatusUpdateDTO;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.Cart;
import com.store.pojo.Customer;
import com.store.pojo.CustomerOrder;
import com.store.pojo.OrderDetails;
import com.store.pojo.Product;

import jakarta.transaction.Transactional;

import com.store.dao.CartDao;
import com.store.dao.CustomerDao;
import com.store.dao.CustomerOrderDao;
import com.store.dao.ProductDao;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private CartDao cartDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private CustomerOrderDao customerOrderDao;
    
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public ApiResponse placeOrder(OrderRequestDTO orderRequest) {
        Customer customer = customerDao.findById(orderRequest.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        double totalAmount = 0.0;
        CustomerOrder order = new CustomerOrder();
        order.setCustomer(customer);
        order.setPaymentMethod(orderRequest.getPaymentMethod());
//        order.setStatus("Placed");
        List<OrderDetails> orderDetailsList = new ArrayList<>();

        for (OrderItemDTO item : orderRequest.getOrderItems()) {
            Product product = productDao.findById(item.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            if (product.getQuantity() < item.getQuantity()) {
                throw new IllegalStateException("Insufficient stock for product: " + product.getTitle());
            }

            product.setQuantity(product.getQuantity() - item.getQuantity());
            productDao.save(product);

            OrderDetails details = new OrderDetails();
            details.setProduct(product);
            details.setPrice(item.getPrice());
            details.setQuantity(item.getQuantity());
            details.setOrder(order);
            orderDetailsList.add(details);

            totalAmount += item.getPrice() * item.getQuantity();
        }

        order.setTotalAmount(totalAmount);
        order.setOrderDetails(orderDetailsList);
        customerOrderDao.save(order);

        return new ApiResponse("success","Order placed successfully with total amount: " + totalAmount);
    }
       
    public ApiResponse removeFromCart(Long customerId, Long productId) {
        Optional<Cart> cart = cartDao.findByCustomerIdAndProductId(customerId, productId);

        if (cart.isEmpty()) {
            return new ApiResponse("error", "Product not found in cart");
        }

        cartDao.delete(cart.get());
        return new ApiResponse("success", "Item removed from cart");
    }
    
    @Override
    public ApiResponse getCustomerOrderDetails(Long customerId) {
        Customer customer = customerDao.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        List<CustomerOrder> orders = customerOrderDao.findByCustomer(customer);

        if (orders.isEmpty()) {
            return new ApiResponse("success", "No orders found for customer ID: " + customerId);
        }

        // Configure ModelMapper for explicit property mappings
        modelMapper.typeMap(CustomerOrder.class, OrderResponseCustDTO.class)
                .addMapping(CustomerOrder::getId, OrderResponseCustDTO::setOrderId)
                .addMapping(CustomerOrder::getStatus, OrderResponseCustDTO::setStatus);

        List<OrderResponseCustDTO> orderDetails = orders.stream()
                .map(order -> {
                    OrderResponseCustDTO response = modelMapper.map(order, OrderResponseCustDTO.class);

                    // Mapping order items explicitly
                    List<OrderItemDTO> itemList = order.getOrderDetails().stream()
                            .map(item -> {
                                OrderItemDTO itemDto = new OrderItemDTO();
                                itemDto.setProductId(item.getProduct().getId());
                                itemDto.setQuantity(item.getQuantity());
                                return itemDto;
                            })
                            .collect(Collectors.toList());

                    response.setItems(itemList);
                    return response;
                }).collect(Collectors.toList());

        return new ApiResponse("success", "Customer orders fetched successfully", orderDetails);
    }

    
    @Override
    public ApiResponse getAllCustomersWithOrders() {
    	 List<Customer> customers = customerDao.findAll();

         if (customers.isEmpty()) {
             return new ApiResponse("success", "No customers found.", null);
         }

         List<CustomerOrdersResponseDTO> customerOrdersList = customers.stream()
                 .map(customer -> {
                     List<CustomerOrder> orders = customerOrderDao.findByCustomer(customer);

                     List<OrderResponseCustDTO> orderDetails = orders.stream()
                             .map(order -> {
                                 OrderResponseCustDTO response = modelMapper.map(order, OrderResponseCustDTO.class);
                                 response.setItems(order.getOrderDetails().stream()
                                         .map(item -> new OrderItemDTO(item.getProduct().getId(),item.getQuantity(),item.getPrice()))
                                         .collect(Collectors.toList()));
                                 return response;
                             })
                             .collect(Collectors.toList());

                     return new CustomerOrdersResponseDTO(
                             customer.getId(),
                             customer.getFirstName() + " " + customer.getLastName(),
                             orderDetails
                     );
                 }).collect(Collectors.toList());

         return new ApiResponse("success", "Customer orders fetched successfully", customerOrdersList);
    }

     @Transactional
    public boolean updateOrderStatus(OrderStatusUpdateDTO statusUpdateDTO) {
        // Fetch the order by its ID from the repository
    	CustomerOrder order = customerOrderDao.findById(statusUpdateDTO.getOrderId())
                                     .orElseThrow(() -> new RuntimeException("Order not found"));

        // Update the order's status
        order.setStatus(statusUpdateDTO.getStatus());

        // Save the updated order back to the database
        customerOrderDao.save(order);

        // Return true indicating successful update
        return true;
    }
}
