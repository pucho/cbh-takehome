# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Add custom ID field to Agents for each Facility relationship**

- **Description:** Update the database schema to store the custom ID for each Agent assigned to a Facility. We will need to create a new table to establish the many-to-many relationship between Agents and Facilities, including the custom ID.
- **Acceptance:** Database schema is updated, and data migration is successful. We are able to assign Custom IDs to an Agent for each Facility.
- **Estimate:** 4 hours
- **Implementation details:** Create a new table 'facility_agent' with columns 'facility_id', 'agent_id', and 'custom_id'. Check that previous relationships work with the new schema.

**Create new API endpoint to set and update custom by facility Agent ID**

- **Description:** Create an API endpoint that allows Facilities to add or update a custom ID for an Agent they work with.
- **Acceptance Criteria:** The API endpoint should allow Facilities to add and update custom IDs for Agents. Proper validation and error handling should be implemented, e.g. duplicates, non standard id's.
- **Time/effort estimate:** 8 hours
- **Implementation details:** Create a new API endpoint (POST /facilities/<facility_id>/agents/<agent_id>/custom_id) that accepts the custom ID as a parameter, validates it, and updates the 'facility_agent' table.

**Update getShiftsByFacility function to include custom Agent IDs**

- **Description:** Modify the existing getShiftsByFacility function to fetch and include the custom IDs for Agents associated with the Facility.
- **Acceptance Criteria:** The updated function should return Shifts with the custom ID for each Agent instead of the internal database ID.
- **Time/effort estimate:** 4 hours
- **Implementation details:** Modify the query in the getShiftsByFacility function to join the 'facility_agent' table and include the custom ID in the response.

**Modify generateReport function to use custom Agent IDs**

- **Description:** Add an optional parameter to the generateReport function to use the custom ID for each Agent in the report instead of the internal database ID.
- **Acceptance Criteria:** The generated PDF report should display the custom IDs for Agents instead of their internal database IDs if the query has the optional parameter.
- **Time/effort estimate:** 8 hours
- **Implementation details:** In the generateReport function, add the functionality to use the internal database ID with the custom ID retrieved from the 'facility_agent' table if the query has the correct flags.
