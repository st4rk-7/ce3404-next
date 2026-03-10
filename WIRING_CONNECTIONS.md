# Complete Wiring Connections - All Interactive Elements

This document contains ALL wiring annotations extracted from the 18 prototype screenshots with red pen markings.

---

## 1. LANDING PAGE (Hero Section)

### Navigation Header
- **Element:** "MEN" link  
  **Action:** Navigate to Men's shop section  
  **Destination:** Men's Shop Page

- **Element:** "WOMEN" link  
  **Action:** Navigate to Women's shop section  
  **Destination:** Women's Shop Page

- **Element:** "SALE" link  
  **Action:** Navigate to Sale section  
  **Destination:** Sale Page

- **Element:** "About" link  
  **Action:** Navigate to About page  
  **Destination:** About Page

- **Element:** "ReBun" link  
  **Action:** Navigate to ReBun page  
  **Destination:** ReBun Page

- **Element:** Search icon  
  **Action:** Open search functionality  
  **Destination:** Search Results

- **Element:** Profile/Account icon  
  **Action:** Navigate to login/account page  
  **Destination:** Login Page

- **Element:** Cart icon  
  **Action:** Open cart drawer overlay  
  **Destination:** Cart Drawer Overlay

### Hero Section Carousel
- **Element:** Left carousel arrow ("<")  
  **Action:** Show previous featured product  
  **Behavior:** Carousel navigation, item move  
  **Destination:** (Same page, carousel state change)

- **Element:** Featured product image  
  **Action:** Display product details  
  **Behavior:** Item carousel display  
  **Destination:** Product Detail Page

- **Element:** Right carousel arrow (">")  
  **Action:** Show next featured product  
  **Behavior:** Carousel navigation, hover effect, item move  
  **Destination:** (Same page, carousel state change)

### Featured Product Buttons
- **Element:** "SHOP MEN" button  
  **Action:** Navigate to men's products  
  **Destination:** Men's Shop Page

- **Element:** "SHOP WOMEN" button  
  **Action:** Navigate to women's products  
  **Destination:** Women's Shop Page

### Category Promotion Tiles
- **Element:** "NEW ARRIVALS" card  
  **Action:** Navigate to new arrivals collection  
  **Behavior:** Shape change animation  
  **Destination:** New Arrivals Collection

- **Element:** "MENS" category card  
  **Action:** Navigate to men's category  
  **Destination:** Men's Shop Page

- **Element:** "WOMEN" category card  
  **Action:** Navigate to women's category  
  **Destination:** Women's Shop Page

- **Element:** "BESTSELLERS" category card  
  **Action:** Navigate to bestsellers collection  
  **Destination:** Bestsellers Collection

---

## 2. MEN'S SALE PAGE (Shop Listing Page)

### Navigation Header
- **Element:** "NEXT" button  
  **Action:** Navigate (unclear destination)  
  **Destination:** (To be clarified)

- **Element:** "MEN" link  
  **Action:** Reaffirm men's shop section (or navigate)  
  **Destination:** Men's Shop Page

- **Element:** "WOMEN" link  
  **Action:** Navigate to women's shop section  
  **Destination:** Women's Shop Page

- **Element:** "SALE" link  
  **Action:** Reaffirm sale section (or navigate)  
  **Destination:** Sale Page

### Sidebar Filter
- **Element:** "FILTER" button  
  **Action:** Open/toggle filter panel overlay  
  **Destination:** Filter Panel (Overlay)

### Product Sorting
- **Element:** "FEATURED" dropdown  
  **Action:** Change product sort order/filtering  
  **Behavior:** Sort by featured, price, new, rating, etc.  
  **Destination:** (Same page, product sort change)

### Product Grid
- **Element:** Each product card/image  
  **Action:** Navigate to product detail  
  **Destination:** Product Detail Page

### Quick Add Feature
- **Element:** "QUICK ADD" overlay on product (e.g., Nike Baseball Cleats)  
  **Action:** Show size selector without leaving page  
  **Behavior:** Hover effect, overlay display  
  **Destination:** N/A (Same page overlay)

- **Element:** Size option in QUICK ADD (e.g., 8, 9, 10, 11, 12)  
  **Action:** Select size for quick add  
  **Destination:** N/A (Same page state change)

### Pagination
- **Element:** "LOAD MORE" button  
  **Action:** Load additional products  
  **Behavior:** Pagination/infinite scroll  
  **Destination:** (Same page, load more products)

---

## 3. FILTER PANEL (Overlay)

### Filter Header
- **Element:** "FILTER" button with count (e.g., "15 products")  
  **Action:** Display active filter status  
  **Destination:** N/A (Informational)

- **Element:** "×" COLLAPSE FILTERS button  
  **Action:** Close filter panel  
  **Behavior:** Collapse overlay  
  **Destination:** (Same page, overlay closes)

### SIZE Filter
- **Element:** Each size option (XS, S, M, L, XL, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13)  
  **Action:** Filter products by selected size(s)  
  **Behavior:** Multi-select, checkbox  
  **Destination:** (Same page, filtered product list)

### COLOR Filter
- **Element:** Each color swatch (Black, Brown, Yellow, Grey, Red, Green, White, Pink, Blue, Beige, Orange)  
  **Action:** Filter products by selected color(s)  
  **Behavior:** Multi-select color filter  
  **Destination:** (Same page, filtered product list)

### PRICE Filter
- **Element:** Each price range option:
  - "Under $75"  
  - "$76 - $100"  
  - "$101 - $125"  
  - "$126 - $150"  
  - "Over $150"  
  **Action:** Filter products by selected price range(s)  
  **Behavior:** Multi-select, checkbox  
  **Destination:** (Same page, filtered product list)

### PRODUCT TYPE Filter
- **Element:** Each product type option:
  - "Everyday Sneakers"  
  - "Fluffs"  
  - "Golf"  
  - "High Tops"  
  - "Hiking Shoes"  
  - "Running Shoes"  
  - "Slip-Ons"  
  - "Water-Repellent Shoes"  
  **Action:** Filter products by selected type(s)  
  **Behavior:** Multi-select filter  
  **Destination:** (Same page, filtered product list)

### MATERIAL Filter
- **Element:** Each material option:
  - "Alternative-Leather"  
  - "Canvas"  
  - "Tree-Fiber-Blend"  
  - "Wool"  
  **Action:** Filter products by selected material(s)  
  **Behavior:** Multi-select filter  
  **Destination:** (Same page, filtered product list)

---

## 4. PRODUCT DETAIL PAGE

### Product Gallery
- **Element:** Left arrow ("<") on product image  
  **Action:** Show previous product image/view  
  **Behavior:** Image carousel navigation  
  **Destination:** (Same page, image carousel)

- **Element:** Product image  
  **Action:** Display current product image  
  **Destination:** N/A (Display only, or possibly zoom)

- **Element:** Right arrow (">") on product image  
  **Action:** Show next product image/view  
  **Behavior:** Image carousel navigation, hover effect  
  **Destination:** (Same page, image carousel)

### Color Selection
- **Element:** Color swatch (e.g., Black, Burnt Olive, Brown/Tan, Red, Grey, Tan, Olive)  
  **Action:** Change product variant/color  
  **Behavior:** Hover effect, change displayed product  
  **Destination:** (Same page, product variant change)

### Size Selection - Men's/Women's Tabs
- **Element:** "Men's Sizes" tab  
  **Action:** Display men's size options  
  **Behavior:** Tab switch  
  **Destination:** (Same page, show men's sizes)

- **Element:** "Women's Sizes" tab  
  **Action:** Display women's size options  
  **Behavior:** Tab switch  
  **Destination:** (Same page, show women's sizes)

### Size Selection - Individual Sizes
- **Element:** Each size option (8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 12.5, 13, 14, 15)  
  **Action:** Select size for product  
  **Behavior:** Single select, highlight selected size, enable "ADD TO CART"  
  **Destination:** (Same page, size selection state change)

### Add to Cart
- **Element:** "SELECT A SIZE" button (or "ADD TO CART" after size selection)  
  **Action:** Add product to cart with selected color and size  
  **Behavior:** After size selection, becomes active  
  **Destination:** Cart (item added, typically stays on page)

- **Element:** "ADD TO CART" button  
  **Action:** Confirm and add product to cart  
  **Destination:** Cart (item added to cart)

### Product Details Section
- **Element:** "DETAILS" section header  
  **Action:** Expand/collapse product details  
  **Behavior:** Expandable section, show product description and features  
  **Special Notes:** Marked with annotation "need this?" - may be optional  
  **Destination:** (Same page, section expand/collapse)

- **Element:** DETAILS content (description, materials, care instructions)  
  **Action:** Display product information  
  **Destination:** N/A (Informational content)

### Shipping & Returns
- **Element:** "SHIPPING & RETURNS" section  
  **Action:** Display shipping and return policy information  
  **Destination:** N/A (Informational, may expand)

### Related Products Section
- **Element:** "YOU MIGHT ALSO LIKE" heading  
  **Action:** Display related/recommended products  
  **Destination:** N/A (Section display)

- **Element:** Related product image/card  
  **Action:** Navigate to that product's detail page  
  **Destination:** Related Product Detail Page

- **Element:** Related product "+" QUICK ADD button  
  **Action:** Show quick add overlay for quick purchase  
  **Behavior:** Quick size/color selection and add to cart without leaving page  
  **Destination:** N/A (Same page, quick add overlay)

### Promotional Banner (TerraLux)
- **Element:** "Like Leather. Only Better." promotional banner with "SHOP NOW" button  
  **Action:** Navigate to TerraLux product collection  
  **Destination:** TerraLux Collection/Products Page

---

## 5. LOGIN PAGE

### Contact Section
- **Element:** Username/Email input field  
  **Action:** Accept user email input  
  **Destination:** N/A (Form input)

- **Element:** Password input field  
  **Action:** Accept user password input  
  **Destination:** N/A (Form input)

- **Element:** "Email me with news and offers" checkbox  
  **Action:** Opt-in to marketing emails  
  **Destination:** N/A (Form preference)

### Sign In Button
- **Element:** "SIGN IN" button  
  **Action:** Submit login form and authenticate  
  **Destination:** Checkout Page (or Dashboard/Account Page)

### Navigation
- **Element:** All header navigation items (MEN, WOMEN, SALE, etc.)  
  **Action:** Same as landing page navigation  
  **Destination:** Respective pages

---

## 6. CART DRAWER (Empty State)

### Header
- **Element:** "CART (0)" heading with count  
  **Action:** Display cart status  
  **Destination:** N/A (Informational)

- **Element:** "×" Close button  
  **Action:** Close cart drawer  
  **Destination:** (Same page, overlay closes)

### Empty Cart Message
- **Element:** "Your cart is empty." message  
  **Action:** Display empty state  
  **Destination:** N/A (Informational)

### Checkout Button
- **Element:** "CHECKOUT" button (in empty or populated cart)  
  **Action:** Proceed to checkout  
  **Destination:** Checkout Page

### Payment Options
- **Element:** "Amazon Pay" button  
  **Action:** Start payment with Amazon Pay  
  **Destination:** Payment Processing (Amazon Pay)

- **Element:** "PayPal" button  
  **Action:** Start payment with PayPal  
  **Destination:** Payment Processing (PayPal)

- **Element:** "Shop Pay" button  
  **Action:** Start payment with Shop Pay  
  **Destination:** Payment Processing (Shop Pay)

---

## 7. CART DRAWER (Populated State with Items)

### Cart Items
- **Element:** Product quantity controls ("+" and "-" buttons)  
  **Action:** Increase/decrease item quantity  
  **Behavior:** Increment/decrement controls, update cart total  
  **Destination:** (Same page, cart update)

- **Element:** "Remove" link on item  
  **Action:** Remove item from cart  
  **Destination:** (Same page, item removed from cart)

### Returns Protection
- **Element:** "Add+" button for Returns Protection plan  
  **Action:** Add protection plan to order  
  **Behavior:** Optional add-on  
  **Destination:** (Same page, plan added to order)

### Recommended For You Section
- **Element:** Recommended product size selector  
  **Action:** Select size for recommended product  
  **Destination:** (Same page, size selection)

- **Element:** Recommended product "+ Colors" link  
  **Action:** Show additional color options  
  **Destination:** (Same page, color options display)

### Checkout
- **Element:** "CHECKOUT" button  
  **Action:** Proceed to checkout page  
  **Destination:** Checkout Page

### Payment Methods
- **Element:** Payment option buttons (Amazon Pay, PayPal, Shop Pay)  
  **Action:** Start payment with selected method  
  **Destination:** Payment Processing

---

## 8. CHECKOUT PAGE (Contact & Delivery Section)

### Express Checkout
- **Element:** "Shop Pay" button  
  **Action:** Quick checkout with Shop Pay  
  **Destination:** Payment Processing

- **Element:** "PayPal" button  
  **Action:** Quick checkout with PayPal  
  **Destination:** Payment Processing

### Contact Section
- **Element:** Email input field  
  **Action:** Enter customer email  
  **Destination:** N/A (Form input)

- **Element:** "Email me with news and offers" checkbox  
  **Action:** Opt-in to marketing  
  **Destination:** N/A (Form preference)

### Delivery Section
- **Element:** Country dropdown (set to "Sri Lanka")  
  **Action:** Select delivery country  
  **Destination:** (Same page, form update)

- **Element:** First name input  
  **Action:** Enter first name  
  **Destination:** N/A (Form input)

- **Element:** Last name input  
  **Action:** Enter last name  
  **Destination:** N/A (Form input)

- **Element:** Company (optional) input  
  **Action:** Enter company name (optional)  
  **Destination:** N/A (Form input)

- **Element:** Address input  
  **Action:** Enter delivery address  
  **Destination:** N/A (Form input)

- **Element:** Apartment/suite (optional) input  
  **Action:** Enter apartment/suite details  
  **Destination:** N/A (Form input)

- **Element:** City input  
  **Action:** Enter city  
  **Destination:** N/A (Form input)

- **Element:** Province dropdown  
  **Action:** Select province/state  
  **Destination:** (Same page, form update)

- **Element:** Postal code input  
  **Action:** Enter postal code  
  **Destination:** N/A (Form input)

- **Element:** Phone (optional) input  
  **Action:** Enter phone number  
  **Destination:** N/A (Form input)

- **Element:** "Text me with news and offers" checkbox  
  **Action:** Opt-in to SMS marketing  
  **Destination:** N/A (Form preference)

### Sign In Link
- **Element:** "Sign in" link  
  **Action:** Navigate to login for existing customers  
  **Destination:** Login Page

### Order Summary (Sidebar)
- **Element:** Discount code input field  
  **Action:** Enter promo/discount code  
  **Destination:** (Same page, discount applied)

- **Element:** "Apply" button  
  **Action:** Apply discount code to order  
  **Destination:** (Same page, order total updated)

---

## 9. CHECKOUT PAGE (Payment Section)

### Payment Methods
- **Element:** "Shop Pay" radio button  
  **Action:** Select Shop Pay as payment method  
  **Destination:** (Same page, payment method selection)

- **Element:** "PayPal" radio button  
  **Action:** Select PayPal as payment method  
  **Destination:** (Same page, payment method selection)

- **Element:** "Afterpay" radio button  
  **Action:** Select Afterpay as payment method  
  **Destination:** (Same page, payment method selection)

### Save Information
- **Element:** "Save my information for a faster checkout" checkbox  
  **Action:** Save customer info for future purchases  
  **Destination:** N/A (Form preference, saves to account)

- **Element:** Mobile phone (optional) input  
  **Action:** Enter mobile phone for saves info  
  **Destination:** N/A (Form input)

### Card Details (if needed)
- **Element:** Expiration date (MM/YY) input  
  **Action:** Enter card expiration  
  **Destination:** N/A (Form input)

- **Element:** Security code input  
  **Action:** Enter card security code (CVV)  
  **Destination:** N/A (Form input)

- **Element:** Name on card input  
  **Action:** Enter cardholder name  
  **Destination:** N/A (Form input)

- **Element:** "Use shipping address as billing address" checkbox  
  **Action:** Use same address for billing  
  **Destination:** N/A (Form preference)

### Payment Confirmation
- **Element:** "PAY NOW" button  
  **Action:** Submit payment and complete order  
  **Destination:** Order Confirmation Page

### Policy Links (Footer)
- **Element:** "Refund policy" link  
  **Action:** Navigate to refund policy  
  **Destination:** Refund Policy Page

- **Element:** "Privacy policy" link  
  **Action:** Navigate to privacy policy  
  **Destination:** Privacy Policy Page

- **Element:** "Terms of service" link  
  **Action:** Navigate to terms of service  
  **Destination:** Terms of Service Page

---

## 10. ORDER CONFIRMATION PAGE

### Confirmation Header
- **Element:** Green checkmark icon  
  **Action:** Display success status  
  **Destination:** N/A (Visual confirmation)

- **Element:** "Order Confirmed!" heading  
  **Action:** Display confirmation message  
  **Destination:** N/A (Informational)

- **Element:** Order number (e.g., "NXT-2UP6P9-R1ST")  
  **Action:** Display order reference  
  **Destination:** N/A (Informational)

### Order Summary
- **Element:** Product details (name, size, quantity, price)  
  **Action:** Display ordered items  
  **Destination:** N/A (Informational)

- **Element:** Shipping cost ("FREE")  
  **Action:** Display shipping charges  
  **Destination:** N/A (Informational)

- **Element:** Total Paid amount  
  **Action:** Display final order total  
  **Destination:** N/A (Informational)

### Confirmation Message
- **Element:** "A confirmation email has been sent..." message  
  **Action:** Notify customer about email and shipping notification  
  **Destination:** N/A (Informational)

### Continue Shopping Button
- **Element:** "CONTINUE SHOPPING" button  
  **Action:** Return to shopping  
  **Behavior:** May lead to home page or shop page (annotation notes "f&s shopping page")  
  **Destination:** Home Page / Shop Page

---

## SUMMARY OF NAVIGATION FLOWS

### Main Page Flows:
1. **Home/Landing** ↔ **Men's Shop** | **Women's Shop** | **Sale** | **Categories**
2. **Shop Page** → **Product Detail**
3. **Product Detail** → **Cart** (via "ADD TO CART" or "QUICK ADD")
4. **Cart** → **Checkout**
5. **Checkout** → **Order Confirmation** (via "PAY NOW")
6. **Order Confirmation** → **Home/Shop** (via "CONTINUE SHOPPING")
7. **Login** → **Checkout** (after sign in)

### Overlay/Modal Flows:
- **Shop Page** ← **Filter Panel** (overlay toggle)
- **Product Detail** ← **Cart Drawer** (overlay toggle)
- **Product Detail** ← **Quick Add** (overlay, inline add-to-cart)
- **Product Detail** ← **Product Carousel** (image carousel within page)

### Key Interactive Elements:
- **Product Carousel** (Featured products on home, product image gallery)
- **Filter Panel** (Multi-select filtering on shop pages)
- **Quick Add** (Inline add-to-cart without page navigation)
- **Cart Drawer** (Persistent sidebar/overlay for viewing/managing cart)
- **Tab Switches** (Men's/Women's sizes on product detail)
- **Color/Size Selection** (Product variant selection)

---

## ANNOTATION NOTES FROM DESIGNER:
- "this shape change 1/2" - Indicates carousel item shape/animation changes
- "hover" - Indicates hover state interaction
- "item move" - Indicates carousel navigation movement
- "hover selecting" - Indicates selection interaction on hover
- "change to" - Indicates state change after selection
- "quick add effect" - Indicates quick add overlay display
- "need this?" - Designer questioning whether DETAILS section is necessary
- "f&s shopping page" - Possible reference to "Find & Shop" shopping page

