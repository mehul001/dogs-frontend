# Candidate Tasks

## 🎯 Test Requirements

This document contains the specific tasks and requirements for the frontend code test.
Once you have completed the work please zip up your code and submit it back to the recruiter.

---

## 🖥️ Current Application State

When you run `npm run start` and navigate to `http://localhost:4200`, you'll see:

### PrimeNG Components Used
- **p-toolbar** - Top navigation bar (currently poorly formatted)
- **p-card** - Individual dog information cards
- **p-paginator** - Pagination controls
- **p-progressSpinner** - Loading indicator
- **p-tag** - Status badges
- **p-button** - Action buttons
- **p-toast** - Notification messages

### Current Layout Issues
- The toolbar is intrusive and poorly formatted
- Dog cards show limited information (name, breed, badge ID, gender)
- Missing important information for handlers (currentStatus, kennellingCharacteristic)
- No action buttons for CRUD operations

---

## Resources
- **Angular Docs**: https://angular.dev/
- **PrimeNG Docs**: https://primeng.org/
- **PrimeNG Component Reference**: https://primeng.org/installation
- **RxJS Docs**: https://rxjs.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/

---

## 📝 Tasks

**Important**: This is a list of progressive tasks. We are trying to evaluate your current skills, so only do the tasks you feel comfortable with. Don't feel obligated to complete all tasks - focus on demonstrating your strengths!

### Task 1: Redesign the Page Layout
**Objective**: Improve the overall user experience and information display

**Requirements**:
- Redesign the page using Angular best practices
- Make the toolbar nice and non-intrusive
- Display dog information properly using different components (not just cards)
- Show comprehensive dog information including:
  - Name, breed, badge ID, gender (visible)
  - Current status (useful for handlers)
  - Kennelling characteristic (useful for handlers)

**Deliverables**:
- Clean, professional layout
- Improved information hierarchy
- Better use of PrimeNG components
- Responsive design

### Task 2: Implement CRUD Operations
**Objective**: Add full read, update, delete functionality

**Requirements**:
- Add buttons to each dog for:
  - **View Details** - Show complete dog information
  - **Edit** - Modify dog information
  - **Delete** - Remove dog (using soft delete API)
- Use the provided API endpoints
- Implement proper error handling
- Add confirmation dialogs for destructive actions

**Deliverables**:
- Functional CRUD operations
- Proper API integration
- User-friendly interactions
- Error handling

### Task 3: Real-time Updates
**Objective**: Keep the interface synchronized with data changes

**Requirements**:
- Update toolbar information when dogs are edited or deleted
- Refresh data after CRUD operations
- Maintain consistent state across components
- Handle loading states appropriately

**Deliverables**:
- Synchronized data updates
- Consistent state management
- Smooth user experience

### Task 4: Advanced State Management
**Objective**: Redesign reactivity and state management

**Requirements**:
- The repository uses observables and signals
- Redesign the reactivity approach using Angular best practices
- Consider using:
  - Angular Signals (modern approach)
  - RxJS operators for complex data flows
  - State management patterns
  - Component communication strategies

**Deliverables**:
- Modern Angular state management
- Clean separation of concerns
- Efficient data flow
- Maintainable code structure

---

Good luck with your code test! 🍀
