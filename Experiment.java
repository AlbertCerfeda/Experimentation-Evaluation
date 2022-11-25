import Algorithms.BubbleSortPassPerItem;
import Algorithms.BubbleSortUntilNoChange;
import Algorithms.BubbleSortWhileNeeded;

import Benchmark.*;

import InputGenerator.*;

import java.io.IOException;
import java.util.List;

public class Experiment {
	
	
	public Experiment() throws IOException {
		final int SEED = 1;
		
		
		// Sets up the algorithms to use
		BenchmarkAlgo[] algosINT = {
				new BubbleSortUntilNoChange<Integer>(Integer.class),
				new BubbleSortPassPerItem<Integer>(Integer.class),
				new BubbleSortWhileNeeded<Integer>(Integer.class)
		};
		BenchmarkAlgo[] algosLONG = {
				new BubbleSortUntilNoChange<Long>(Long.class),
				new BubbleSortPassPerItem<Long>(Long.class),
				new BubbleSortWhileNeeded<Long>(Long.class)
		};
		BenchmarkAlgo[] algosSTRING = {
				new BubbleSortUntilNoChange<String>(String.class),
				new BubbleSortPassPerItem<String>(String.class),
				new BubbleSortWhileNeeded<String>(String.class)
		};
		
		int[] arraysizes = {10,100,1000};
		

		
		// Sets up the CSV logger
		CSVBenchmark csv = new CSVBenchmark("results.csv",false);
		
		
		// Benchmarking for INTEGER
		ArrayInputGenerator generator = new IntegerArrayInputGenerator(SEED);
		
		for(int arraysize : arraysizes) {
			generator.generateInputs(arraysize);
			performBenchmark(csv, algosINT, generator.getInputs());
		}
		
		// Benchmarking for LONG
		generator = new LongArrayInputGenerator(generator);
		
		for(int arraysize : arraysizes) {
			generator.generateInputs(arraysize);
			performBenchmark(csv, algosLONG, generator.getInputs());
		}
		
		
		// Benchmarking for STRING
		generator = new StringArrayInputGenerator(generator, 5,10);
		for(int arraysize : arraysizes) {
			generator.generateInputs(arraysize);
			performBenchmark(csv, algosSTRING, generator.getInputs());
		}
		
		
		csv.stop();
	}
	
	void performBenchmark(CSVBenchmark logger, BenchmarkAlgo[] algos, List<Input> inputs) throws IOException{
		BenchmarkResults result;
		// Every input
		for(Input input : inputs){
			// Every algorithm
			for (BenchmarkAlgo algo : algos){
				result=new Benchmark(algo, input, 1000, 100000).runBenchmark();
				System.out.println(result.toString());
				// Logs to CSV
				logger.append(result);
			}
//			logger.save();
		}
	}
	
	
}
