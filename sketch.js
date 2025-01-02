let slider;
let canvasSize;
let animationProgress = []; // Track animation progress for each cell

function setup() {
  // Calculate canvas size to be square and fit within the window
  canvasSize = min(windowWidth, windowHeight) * 0.6; // 60% of the smaller dimension
  createCanvas(canvasSize, canvasSize); // Create a square canvas
  noStroke(); // No border for circles
  textAlign(CENTER, CENTER); // Center text in circles

  // Create a slider for controlling the number of visible numbers
  slider = createSlider(0, 25, 25); // Min: 0, Max: 25, Default: 25
  updateSliderSize(); // Set initial slider size
  positionSlider(); // Position the slider

  slider.input(() => {
    redraw(); // Redraw canvas when slider changes
    updateAnimationProgress(); // Update animation progress
  });

  // Initialize animation progress for each cell
  for (let i = 0; i < 25; i++) {
    animationProgress[i] = 0; // Start with no progress
  }
}

function draw() {
  background(240);

  const cols = 5; // Fixed number of columns
  const rows = 5; // Fixed number of rows
  const cellSize = width / cols; // Size of each grid cell

  // Dynamically adjust text size based on cell size
  textSize(cellSize * 0.3); // Text size scales with cell size

  // Get the number of visible numbers from the slider
  const visibleNumbers = slider.value();

  let count = 0; // Counter for visible numbers

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = i * cellSize + cellSize / 2; // X position of circle
      const y = j * cellSize + cellSize / 2; // Y position of circle
      const index = i + j * cols; // Unique index for each cell

      // Update animation progress for this cell
      const targetProgress = count < visibleNumbers ? 1 : 0; // 1 if visible, 0 if not
      animationProgress[index] = lerp(animationProgress[index], targetProgress, 0.1); // Smooth transition

      // Draw circle and number if the animation progress is greater than 0
      if (animationProgress[index] > 0) {
        drawCircleAndNumber(x, y, cellSize, index + 1, animationProgress[index]);
      }

      if (count < visibleNumbers) {
        count++; // Increment the counter
      }
    }
  }

  // Display slider value
  fill(0);
  textSize(16); // Fixed size for slider value text
  text(`Visible Numbers: ${visibleNumbers}`, width / 2, height + 50);
}

function drawCircleAndNumber(x, y, cellSize, number, progress) {
  const radius = cellSize * 0.3 * progress; // Circle radius scales with animation progress

  textFont('Quicksand');
  // Draw circle
  fill(220, 220, 220); // Circle color
  circle(x, y, radius * 2);

  // Add text with transparency
  fill(255, 255, 255, progress * 255); // Text color with alpha based on progress
  text(number, x, y);
}

function updateSliderSize() {
  // Set slider width to 75% of the canvas width, with a minimum of 200px
  const sliderWidth = max(width * 0.75, 200); // Ensure slider is at least 200px wide
  slider.style('width', `${sliderWidth}px`);
}

function positionSlider() {
  const canvasX = (windowWidth - width) / 2; // X position of canvas
  const canvasY = (windowHeight - height) / 2; // Y position of canvas
  const sliderWidth = parseFloat(slider.style('width')); // Get current slider width
  slider.position(canvasX + (width - sliderWidth) / 2, canvasY + height + 20); // Center slider below canvas
}

function windowResized() {
  // Recalculate canvas size to remain square
  canvasSize = min(windowWidth, windowHeight) * 0.6; // 60% of the smaller dimension
  resizeCanvas(canvasSize, canvasSize); // Resize canvas to new square dimensions
  updateSliderSize(); // Update slider size
  positionSlider(); // Reposition the slider
  redraw(); // Redraw the content
}

function updateAnimationProgress() {
  // Update animation progress for all cells
  for (let i = 0; i < 25; i++) {
    const targetProgress = i < slider.value() ? 1 : 0; // 1 if visible, 0 if not
    animationProgress[i] = lerp(animationProgress[i], targetProgress, 0.1); // Smooth transition
  }
}