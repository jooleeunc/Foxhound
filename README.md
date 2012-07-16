Foxhound
========

Know your JavaScript application.  Make sure you can track your JavaScript events and event handlers.

PROBLEM

Have you ever created a complex event-driven JavaScript application?  Such applications make code more maintainable with loose coupling.  However, for a complex JavaScript application where there are many JavaScript files in different folders defining event handlers and firing events, maintaining and keeping track become difficult.  Only hope is to do a text search in hopes that the event names are somewhat unique, not named like "init" or "setup" where it could return too many false positives to be useful.

SOLUTION

This is where Foxhound comes in.  It is a very simple JavaScript event management library.  If you use Foxhound to define and fire your events, it can track all event handlers in your application given an event name and display it on your browser JavaScript console.  There is no more need for a text search.
