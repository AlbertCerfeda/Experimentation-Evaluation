import Benchmark.BenchmarkResults;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

/**
 * Outputs benchmark results to CSV file.
 */
public class CSVBenchmark {
	private PrintWriter printwriter;
	String filename;
	boolean appendToFile;
	
	/**
	 * Default constructor.
	 * @param filename the filename where the results are written into.
	 * @param append whether to clear the files content.
	 * @throws IOException if the named file exists but is a directory rather than a regular file,
	 * does not exist but cannot be created,
	 * or cannot be opened for any other reason.
	 */
	public CSVBenchmark(String filename, boolean append) throws IOException{
		this.filename = filename;
		this.appendToFile = append;
		createPrintwriter(filename, append);
		
		if(!append)
			printwriter.append(String.join(delimiter,header));
	}
	
	/**
	 * The CSV column delimiter.
	 */
	final String delimiter= ";";
	/**
	 * Header entries.
	 */
	final String[] header = {
			"Algorithm",
			"Input_name",
			"Input_description",
			"Runs_warmup",
			"Runs_actual",
			"AVG Result",
			"Input_length",
			"Input_values"
	};
	
	/**
	 * Appends a benchmark result to the CSV file.
	 * @param result
	 */
	public <T> void append(BenchmarkResults result) {
		String[] values = new String[] {
				result.getAlgorithm_name(),
				result.getInput().name,
				result.getInput().description,
				String.valueOf(result.getWarmupRunsNumber()),
				String.valueOf(result.getActualRunsNumber()),
				String.valueOf(result.getAverageResult()),
				String.valueOf(((T[])result.getInput().value).length),
				Arrays.toString((T[])result.getInput().value)
		};
		printwriter.append("\n"+String.join(delimiter,values));
	}
	
	/**
	 * Saves the file and releases the Operating System handle on the file.
	 */
	public void save() throws IOException{
		stop();
		createPrintwriter(filename, true);
	}
	
	public void stop() {
		printwriter.flush();
		printwriter.close();
	}
	
	private void createPrintwriter(String filename, boolean append) throws IOException{
		printwriter = new PrintWriter(new FileWriter(filename, append));
	}
	
}
