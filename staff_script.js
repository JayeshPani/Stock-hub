// Hamburger menu toggle for mobile responsiveness
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
  });
  
  // Smooth scroll to a section by ID
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }
  
  // Product form submission to add a new product row dynamically
  document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productStock = document.getElementById('product-stock').value;
    const productTable = document.getElementById('product-table');
    const newRow = document.createElement('tr');
    const newId = productTable.rows.length + 1;
    newRow.innerHTML = `<td>${newId}</td><td>${productName}</td><td>${productStock}</td>`;
    productTable.appendChild(newRow);
    this.reset();
  });
  
  // Order status update functionality
  function setupOrderStatusUpdates() {
    document.querySelectorAll('.update-btn').forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const statusSelect = row.querySelector('.status-update');
        const statusCell = row.cells[4]; // The status cell (5th column)
        statusCell.textContent = statusSelect.options[statusSelect.selectedIndex].text;
      });
    });
  }
  
  // Initial setup of order status updates
  setupOrderStatusUpdates();
  
  // Order search and filter functionality
  document.getElementById('search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('customer-search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    
    document.querySelectorAll('#order-table tr').forEach(row => {
      const customerName = row.cells[1].textContent.toLowerCase();
      const orderStatus = row.cells[4].textContent.toLowerCase();
      
      const matchesSearch = searchTerm === '' || customerName.includes(searchTerm);
      const matchesFilter = statusFilter === 'all' || orderStatus === statusFilter;
      
      row.style.display = matchesSearch && matchesFilter ? '' : 'none';
    });
  });
  
  // Barcode scanning simulation
  document.querySelector('.scan-btn').addEventListener('click', function() {
    alert('Barcode scanning feature coming soon!');
  });
  
  // Export buttons functionality
  document.querySelectorAll('.export-btn').forEach(button => {
    button.addEventListener('click', function() {
      const format = this.textContent.split(' ')[1];
      alert(`Exporting data in ${format} format. This feature is coming soon!`);
    });
  });
  
  // Logout functionality (for demonstration)
  document.querySelector('a[href="#logout"]').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
      window.location.href = 'login.html';
    }
  });
  
  // Add event listener for dynamically added products
  document.getElementById('product-table').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === 'TD') {
      const row = e.target.parentNode;
      const productId = row.cells[0].textContent;
      const productName = row.cells[1].textContent;
      const currentStock = row.cells[2].textContent;
      
      const newStock = prompt(`Update stock for ${productName} (Current: ${currentStock}):`, currentStock);
      if (newStock !== null && !isNaN(newStock)) {
        row.cells[2].textContent = newStock;
        alert(`Stock updated for ${productName} (ID: ${productId})`);
      }
    }
  });
  
  // Function to add a new order (for demonstration purposes)
  function addNewOrder(customer, items, date, status) {
    const orderTable = document.getElementById('order-table');
    const newRow = document.createElement('tr');
    const newId = orderTable.rows.length + 1;
    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${customer}</td>
      <td>${items}</td>
      <td>${date}</td>
      <td>${status}</td>
      <td>
        <select class="status-update">
          <option value="processing" ${status === 'Processing' ? 'selected' : ''}>Processing</option>
          <option value="shipped" ${status === 'Shipped' ? 'selected' : ''}>Shipped</option>
          <option value="delivered" ${status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="cancelled" ${status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
        <button class="btn small-btn update-btn">Update</button>
      </td>
    `;
    orderTable.appendChild(newRow);
    setupOrderStatusUpdates(); // Re-setup event listeners for new buttons
  }
  
  // Example usage: Add a new order every 30 seconds (for demonstration)
  setInterval(() => {
    const customers = ['Alice Johnson', 'Bob Williams', 'Charlie Brown', 'Diana Martinez'];
    const items = ['Widget A (3)', 'Gadget B (2)', 'Component C (1)', 'Widget A (1), Gadget B (1)'];
    const statuses = ['Processing', 'Shipped', 'Delivered', 'Processing'];
    
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const randomItems = items[Math.floor(Math.random() * items.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const currentDate = new Date().toISOString().split('T')[0];
    
    addNewOrder(randomCustomer, randomItems, currentDate, randomStatus);
  }, 30000);
  