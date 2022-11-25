package InputGenerator;

import java.util.ArrayList;
import java.util.Random;

public abstract class ArrayInputGenerator<T> {
	protected long seed = 1234;
	protected Random generator = new Random(seed);
	protected ArrayList<Input<T>> inputs = new ArrayList<>();
	
	public ArrayInputGenerator() {
	
	}
	public ArrayInputGenerator(ArrayInputGenerator old) {
		this.generator = old.getGenerator();
	}
	
	
	public ArrayInputGenerator(long seed) {
		this.seed = seed;
		generator = new Random(seed);
	}
	
	public abstract void generateInputs(int inputSize);
	
	
	public ArrayList<Input<T>> getInputs(){
		return inputs;
	}
	
	public Random getGenerator(){
		return generator;
	}
}
