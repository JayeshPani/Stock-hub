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
  
  // Order form submission to add a new order row dynamically
  document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const customer = document.getElementById('order-customer').value;
    const items = document.getElementById('order-items').value;
    const orderTable = document.getElementById('order-table');
    const newRow = document.createElement('tr');
    const newId = orderTable.rows.length + 1;
    newRow.innerHTML = `<td>${newId}</td><td>${customer}</td><td>${items}</td><td>Processing</td>`;
    orderTable.appendChild(newRow);
    this.reset();
  });
  