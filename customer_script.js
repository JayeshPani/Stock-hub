// Hamburger menu toggle for mobile responsiveness
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
  });
  
  // Smooth scroll to a section by ID
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }
  
  // Order form submission to add a new order row dynamically
  document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const customer = document.getElementById('order-customer').value;
    const items = document.getElementById('order-items').value;
    const orderTable = document.getElementById('order-table');
    const newRow = document.createElement('tr');
    const newId = orderTable.rows.length + 1;
    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${customer}</td>
      <td>${items}</td>
      <td>Processing</td>
      <td>
        <button class="btn small-btn cancel-btn" data-order-id="${newId}">
          <i class="fas fa-times"></i> Cancel
        </button>
      </td>
    `;
    orderTable.appendChild(newRow);
    this.reset();
    
    // Add event listener to the new cancel button
    setupActionButtons();
  });
  
  // Return form submission
  document.getElementById('return-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const orderId = document.getElementById('return-order').value;
    const reason = document.getElementById('return-reason').options[document.getElementById('return-reason').selectedIndex].text;
    const comments = document.getElementById('return-comments').value;
    
    // Get the order details from the order table
    const orderRow = document.querySelector(`#order-table tr td:first-child:contains('${orderId}')`).closest('tr');
    const items = orderRow ? orderRow.cells[2].textContent : 'Unknown items';
    
    const returnsTable = document.getElementById('returns-table');
    const newRow = document.createElement('tr');
    const newId = returnsTable.rows.length + 1;
    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${orderId}</td>
      <td>${items}</td>
      <td>${reason}</td>
      <td>Pending</td>
    `;
    returnsTable.appendChild(newRow);
    this.reset();
    
    alert('Return request submitted successfully!');
  });
  
  // Setup action buttons (Cancel, Track, Return)
  function setupActionButtons() {
    // Cancel order buttons
    document.querySelectorAll('.cancel-btn').forEach(button => {
      button.addEventListener('click', function() {
        const orderId = this.getAttribute('data-order-id');
        if (confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
          const row = this.closest('tr');
          row.cells[3].textContent = 'Cancelled';
          this.remove(); // Remove the cancel button
          alert(`Order #${orderId} has been cancelled.`);
        }
      });
    });
    
    // Track order buttons
    document.querySelectorAll('.track-btn').forEach(button => {
      button.addEventListener('click', function() {
        const orderId = this.getAttribute('data-order-id');
        alert(`Tracking information for Order #${orderId}:\nCarrier: FastShip\nTracking #: FS${orderId}12345\nEstimated Delivery: In 2-3 business days`);
      });
    });
    
    // Return order buttons
    document.querySelectorAll('.return-btn').forEach(button => {
      button.addEventListener('click', function() {
        const orderId = this.getAttribute('data-order-id');
        scrollToSection('returns');
        
        // Pre-select the order in the return form
        const returnOrderSelect = document.getElementById('return-order');
        for (let i = 0; i < returnOrderSelect.options.length; i++) {
          if (returnOrderSelect.options[i].value === orderId) {
            returnOrderSelect.selectedIndex = i;
            break;
          }
        }
        
        // Focus on the reason field
        document.getElementById('return-reason').focus();
      });
    });
  }
  
  // Initial setup of action buttons
  setupActionButtons();
  
  // Helper function for selecting elements by text content
  Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
  };
  
  // Logout functionality
  document.querySelector('a[href="#logout"]').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
      window.location.href = 'login.html';
    }
  });
  