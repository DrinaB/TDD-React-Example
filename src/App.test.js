import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

  test("As a Chef, I want to store my recipes so that I can keep track of them.", () => {
    render(<App />);
    let recipeHeader = screen.getByText("My Recipes");
    expect(recipeHeader).toBeInTheDocument();

    let recipeList = screen.getByText("There are no recipes to list");
    expect(recipeList).toBeInTheDocument();
    expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);
  });

  test("contains an add recipe button", () => {
    render(<App />);
    let recipeHeader = screen.getByText("My Recipes");
    let button = screen.getByRole('button', {name: 'Add Recipe'});

    expect(button).toBeInTheDocument();
    expect(recipeHeader.compareDocumentPosition(button)).toBe(4)
  })

  test("contains an add recipe button that when clicked opens a form", async () => {
    render(<App />);

    let button = screen.getByRole('button', {name: "Add Recipe"});
    userEvent.click(button);
    let form = await screen.findByRole('form', undefined, {timeout:3000});
    expect(form).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /Recipe Name/i})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /instructions/i})).toBeInTheDocument();

    button = screen.queryByRole('button', {name: 'Add Recipe'});
    expect(button).toBeNull();
  });

  test("shows new recipe after adding", async () => {
    // render the landing page
    render(<App />);
  
    // Add recipe
    let button = screen.getByRole('button', {name: 'Add Recipe'});
    userEvent.click(button);
  
    // wait for the form/textbox to appear, used findBy because it returns a promise
    let recipeNameBox = await screen.findByRole('textbox', {name: /Recipe name/i});
    let recipeInstructionBox = screen.getByRole('textbox', {name: /instructions/i});
  
    // add recipe
    const recipeName = 'Tofu Scramble Tacos';
    const recipeInstructions = "1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas";
    userEvent.type(recipeNameBox, recipeName);
    userEvent.type(recipeInstructionBox, recipeInstructions);
  
    // click the submit button
    let submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
  
    // wait for text to appear, a timeout means it was never found
    let recipe = await screen.findByText(/Name:.*Tofu Scramble Tacos/i);
  });
